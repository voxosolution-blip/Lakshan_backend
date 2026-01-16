import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hashPassword } from './password.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeDatabase() {
  try {
    // Check if schema is already initialized by checking if users table exists
    const tableExists = await pool.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users');`
    );

    if (tableExists.rows[0].exists) {
      console.log('✅ Database schema already initialized');
      
      // Check if we need to seed data
      const userCount = await pool.query('SELECT COUNT(*) as count FROM users');
      if (parseInt(userCount.rows[0].count) === 0) {
        console.log('📋 Seeding default users...');
        await seedDefaultUsers();
      }
      return;
    }

    console.log('📋 Initializing database schema...');

    // Read schema.sql
    const schemaPath = path.join(__dirname, '../../..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);
    console.log('✅ Database schema created successfully');

    // Try to run migrations if they exist
    try {
      const migrationsDir = path.join(__dirname, '../../..', 'database', 'migrations');
      
      if (fs.existsSync(migrationsDir)) {
        const migrationFiles = fs.readdirSync(migrationsDir)
          .filter(f => f.endsWith('.sql'))
          .sort();

        for (const file of migrationFiles) {
          const migrationPath = path.join(migrationsDir, file);
          const migration = fs.readFileSync(migrationPath, 'utf8');
          
          try {
            await pool.query(migration);
            console.log(`✅ Applied migration: ${file}`);
          } catch (err) {
            // Some migrations might fail if features already exist, that's ok
            console.log(`⚠️ Migration ${file}: ${err.message.split('\n')[0]}`);
          }
        }
      }
    } catch (err) {
      console.log('⚠️ Could not apply migrations:', err.message);
    }

    // Seed default users after schema creation
    console.log('📋 Seeding default users...');
    await seedDefaultUsers();

  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    console.error('   The database will need to be manually initialized.');
    console.error('   Run: psql -U postgres -d yogurt_erp -f database/schema.sql');
  }
}

async function seedDefaultUsers() {
  try {
    // Hash passwords
    const adminPassword = await hashPassword('admin123');
    const salesPassword = await hashPassword('salesperson123');

    // Create admin user
    await pool.query(
      `INSERT INTO users (username, password_hash, name, email, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING`,
      ['admin', adminPassword, 'System Administrator', 'admin@yogurt.com', 'ADMIN']
    );

    // Create salesperson user
    await pool.query(
      `INSERT INTO users (username, password_hash, name, email, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username) DO NOTHING`,
      ['salesperson', salesPassword, 'Sales Person', 'sales@yogurt.com', 'SALESPERSON']
    );

    console.log('✅ Default users seeded successfully');
    console.log('   Admin: admin / admin123');
    console.log('   Salesperson: salesperson / salesperson123');
  } catch (error) {
    console.error('⚠️ Failed to seed default users:', error.message);
  }
}

export default initializeDatabase;
