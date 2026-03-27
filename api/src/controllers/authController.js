import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken, clearToken } from '../middleware/auth.js';

/**
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { email, password, company_name, company_title, tax_office, tax_number, company_size } = req.body;

    if (!email || !password || !company_name) {
      return res.status(400).json({ error: 'Email, password and company name are required' });
    }

    const existing = await pool.query('SELECT id FROM customers WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'A customer with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO customers (email, password, company_name, company_title, tax_office, tax_number, company_size)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, company_name, company_title, tax_office, tax_number, company_size, created_at`,
      [email, hashedPassword, company_name, company_title || null, tax_office || null, tax_number || null, company_size || null]
    );

    const customer = result.rows[0];
    generateToken(res, { id: customer.id, email: customer.email, role: 'customer' });

    res.status(201).json({ message: 'Registration successful', user: customer });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const customer = result.rows[0];
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    generateToken(res, { id: customer.id, email: customer.email, role: 'customer' });

    const { password: _, ...customerData } = customer;
    res.json({ message: 'Login successful', user: customerData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/auth/logout
 */
export const logout = (req, res) => {
  clearToken(res);
  res.json({ message: 'Logged out successfully' });
};

/**
 * GET /api/auth/me
 */
export const getMe = async (req, res) => {
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
    console.error('GetMe error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
