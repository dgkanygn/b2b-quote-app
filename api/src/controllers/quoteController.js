import pool from '../config/db.js';

/**
 * POST /api/quotes
 */
export const create = async (req, res) => {
  const client = await pool.connect();

  try {
    const { guest_email, guest_company_name, note, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }

    const customerId = req.user?.role === 'customer' ? req.user.id : null;
    if (!customerId && !guest_email) {
      return res.status(400).json({ error: 'Guest email is required for unauthenticated requests' });
    }

    await client.query('BEGIN');

    const requestResult = await client.query(
      `INSERT INTO requests (customer_id, guest_email, guest_company_name, note, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [customerId, customerId ? null : guest_email, customerId ? null : (guest_company_name || null), note || null]
    );

    const request = requestResult.rows[0];

    const insertedItems = [];
    for (const item of items) {
      if (!item.product_id || !item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Each item must have product_id and quantity' });
      }

      const itemResult = await client.query(
        `INSERT INTO request_items (request_id, product_id, quantity, offered_price)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [request.id, item.product_id, item.quantity, item.offered_price || 0]
      );

      insertedItems.push(itemResult.rows[0]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Quote request created successfully',
      quote: { ...request, items: insertedItems },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Create quote error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};

/**
 * GET /api/quotes
 */
export const getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`r.status = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM requests r ${whereClause}`,
      params
    );
    const totalCount = parseInt(countResult.rows[0].count);

    params.push(parseInt(limit));
    params.push(offset);
    const result = await pool.query(
      `SELECT r.*, c.email AS customer_email, c.company_name AS customer_company_name
       FROM requests r
       LEFT JOIN customers c ON r.customer_id = c.id
       ${whereClause}
       ORDER BY r.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      quotes: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get all quotes error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/quotes/user
 */
export const getUserQuotes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, 
        (SELECT json_agg(json_build_object(
          'id', ri.id, 'product_id', ri.product_id, 'quantity', ri.quantity, 'offered_price', ri.offered_price,
          'product_name', p.name, 'product_category', p.category
        ))
        FROM request_items ri
        LEFT JOIN products p ON ri.product_id = p.id
        WHERE ri.request_id = r.id) AS items
       FROM requests r
       WHERE r.customer_id = $1
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );

    res.json({ quotes: result.rows });
  } catch (err) {
    console.error('Get user quotes error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/quotes/:id
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const requestResult = await pool.query(
      `SELECT r.*, c.email AS customer_email, c.company_name AS customer_company_name
       FROM requests r
       LEFT JOIN customers c ON r.customer_id = c.id
       WHERE r.id = $1`,
      [id]
    );

    if (requestResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    const quote = requestResult.rows[0];

    if (req.user.role === 'customer' && quote.customer_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const itemsResult = await pool.query(
      `SELECT ri.*, p.name AS product_name, p.category AS product_category, p.images AS product_images
       FROM request_items ri
       LEFT JOIN products p ON ri.product_id = p.id
       WHERE ri.request_id = $1`,
      [id]
    );

    res.json({
      quote: { ...quote, items: itemsResult.rows },
    });
  } catch (err) {
    console.error('Get quote by id error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/quotes/:id/status
 */
export const updateStatus = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;
    const { status, total_price, items } = req.body;

    const validStatuses = ['pending', 'responded', 'rejected'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE requests SET status = $1, total_price = COALESCE($2, total_price) WHERE id = $3 RETURNING *`,
      [status, total_price, id]
    );

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Quote not found' });
    }

    if (items && Array.isArray(items)) {
      for (const item of items) {
        if (item.id && item.offered_price !== undefined) {
          await client.query(
            'UPDATE request_items SET offered_price = $1 WHERE id = $2 AND request_id = $3',
            [item.offered_price, item.id, id]
          );
        }
      }
    }

    await client.query('COMMIT');

    const updatedQuote = await pool.query(
      `SELECT r.*, c.email AS customer_email, c.company_name AS customer_company_name
       FROM requests r
       LEFT JOIN customers c ON r.customer_id = c.id
       WHERE r.id = $1`,
      [id]
    );

    const updatedItems = await pool.query(
      `SELECT ri.*, p.name AS product_name
       FROM request_items ri
       LEFT JOIN products p ON ri.product_id = p.id
       WHERE ri.request_id = $1`,
      [id]
    );

    res.json({
      message: 'Quote status updated',
      quote: { ...updatedQuote.rows[0], items: updatedItems.rows },
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Update quote status error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
