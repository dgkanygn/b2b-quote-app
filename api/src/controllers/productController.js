import pool from '../config/db.js';

/**
 * GET /api/products
 */
export const getAll = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(name ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM products ${whereClause}`,
      params
    );
    const totalCount = parseInt(countResult.rows[0].count);

    params.push(parseInt(limit));
    params.push(offset);
    const result = await pool.query(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      products: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalCount,
        totalPages: Math.ceil(totalCount / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get products error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/products/categories
 */
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category'
    );
    const categories = result.rows.map((row) => row.category);
    res.json({ categories });
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/products/:id
 */
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error('Get product by id error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/products
 */
export const create = async (req, res) => {
  try {
    const { name, category, description, stock, images, status } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const result = await pool.query(
      `INSERT INTO products (name, category, description, stock, images, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, category || null, description || null, stock || 0, images || '{}', status || 'active']
    );

    res.status(201).json({ product: result.rows[0] });
  } catch (err) {
    console.error('Create product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/products/:id
 */
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, stock, images, status } = req.body;

    const existing = await pool.query('SELECT id FROM products WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const result = await pool.query(
      `UPDATE products SET
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        description = COALESCE($3, description),
        stock = COALESCE($4, stock),
        images = COALESCE($5, images),
        status = COALESCE($6, status)
       WHERE id = $7
       RETURNING *`,
      [name, category, description, stock, images, status, id]
    );

    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/products/:id
 */
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/products/:id/images
 */
export const uploadImages = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const newImages = req.files.map((file) => `/uploads/${file.filename}`);
    const currentImages = existing.rows[0].images || [];
    const allImages = [...currentImages, ...newImages];

    const result = await pool.query(
      'UPDATE products SET images = $1 WHERE id = $2 RETURNING *',
      [allImages, id]
    );

    res.json({ product: result.rows[0] });
  } catch (err) {
    console.error('Upload images error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
