import pool from '../config/db.js';

/**
 * GET /api/user/profile
 */
export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, company_name, company_title, tax_office, tax_number, company_size, created_at FROM customers WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/user/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { company_name, company_title, tax_office, tax_number, company_size } = req.body;

    const result = await pool.query(
      `UPDATE customers SET
        company_name = COALESCE($1, company_name),
        company_title = COALESCE($2, company_title),
        tax_office = COALESCE($3, tax_office),
        tax_number = COALESCE($4, tax_number),
        company_size = COALESCE($5, company_size)
       WHERE id = $6
       RETURNING id, email, company_name, company_title, tax_office, tax_number, company_size, created_at`,
      [company_name, company_title, tax_office, tax_number, company_size, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
