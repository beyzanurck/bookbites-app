import pg from 'pg'

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

export default db;