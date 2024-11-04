const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const fs = require('fs').promises;

class Database {
    constructor() {
        this.db = null;
    }

    async initialize() {
        if (this.db) return this.db;

        this.db = await open({
            filename: process.env.DB_PATH || '/app/data/movies.db',
            driver: sqlite3.Database
        });

        // Initialize schema
        const schema = await fs.readFile('/app/schema.sql', 'utf8');
        await this.db.exec(schema);

        return this.db;
    }

    async close() {
        if (this.db) {
            await this.db.close();
            this.db = null;
        }
    }
}

module.exports = new Database();