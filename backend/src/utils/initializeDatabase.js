import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    console.error('   The database will need to be manually initialized.');
    console.error('   Run: psql -U postgres -d yogurt_erp -f database/schema.sql');
  }
}

export default initializeDatabase;
