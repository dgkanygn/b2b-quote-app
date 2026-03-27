import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const migrate = async () => {
  let client;

  try {
    client = await pool.connect();
    console.log('🔄 Running migrations...');

    await client.query('BEGIN');

    // Admins table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ admins table created');

    // Customers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        company_title VARCHAR(255),
        tax_office VARCHAR(255),
        tax_number VARCHAR(50),
        company_size VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ customers table created');

    // Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        stock INT DEFAULT 0,
        images TEXT[] DEFAULT '{}',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ products table created');

    // Requests (quotes) table
    await client.query(`
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
        guest_email VARCHAR(255),
        guest_company_name VARCHAR(255),
        note TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        total_price DECIMAL(12,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ requests table created');

    // Request items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS request_items (
        id SERIAL PRIMARY KEY,
        request_id INT REFERENCES requests(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE SET NULL,
        quantity INT NOT NULL,
        offered_price DECIMAL(12,2) DEFAULT 0
      );
    `);
    console.log('✅ request_items table created');

    // Seed default admin
    const adminExists = await client.query('SELECT id FROM admins WHERE email = $1', ['admin@nexusb2b.com']);
    if (adminExists.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO admins (email, password) VALUES ($1, $2)',
        ['admin@nexusb2b.com', hashedPassword]
      );
      console.log('✅ Default admin created (admin@nexusb2b.com / admin123)');
    } else {
      console.log('ℹ️  Default admin already exists');
    }

    await client.query('COMMIT');
    console.log('🎉 All migrations completed successfully!');
  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err.message);
    throw err;
  } finally {
    if (client) client.release();
    await pool.end();
  }
};

migrate().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
