import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken, clearToken } from '../middleware/auth.js';

/**
 * POST /api/admin/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    generateToken(res, { id: admin.id, email: admin.email, role: 'admin' });

    res.json({
      message: 'Admin login successful',
      user: { id: admin.id, email: admin.email, role: 'admin' },
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/admin/logout
 */
export const logout = (req, res) => {
  clearToken(res);
  res.json({ message: 'Logged out successfully' });
};

/**
 * GET /api/admin/me
 */
export const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, created_at FROM admins WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ user: { ...result.rows[0], role: 'admin' } });
  } catch (err) {
    console.error('Admin getMe error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
