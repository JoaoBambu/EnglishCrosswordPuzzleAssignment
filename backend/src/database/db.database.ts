import Database from 'better-sqlite3';

const db = new Database('./src/database/database.db');

db.pragma('foreign_keys = ON');

export default db;
