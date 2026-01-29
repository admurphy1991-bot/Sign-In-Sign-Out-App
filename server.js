const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize database table
async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS visitors (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                company VARCHAR(255) NOT NULL,
                type VARCHAR(100) NOT NULL,
                contact VARCHAR(100),
                sign_in_time TIMESTAMP NOT NULL,
                sign_out_time TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Database table initialized');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
    }
}

// Get all visitors
app.get('/api/visitors', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM visitors ORDER BY sign_in_time DESC'
        );
        
        // Convert to format expected by frontend
        const visitors = result.rows.map(row => ({
            id: parseInt(row.id),
            name: row.name,
            company: row.company,
            type: row.type,
            contact: row.contact,
            signInTime: row.sign_in_time,
            signOutTime: row.sign_out_time
        }));
        
        res.json(visitors);
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ error: 'Failed to read visitors' });
    }
});

// Add new visitor (sign in)
app.post('/api/visitors', async (req, res) => {
    try {
        const { name, company, type, contact } = req.body;
        const signInTime = new Date();
        
        const result = await pool.query(
            `INSERT INTO visitors (name, company, type, contact, sign_in_time) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [name, company, type, contact || null, signInTime]
        );
        
        const newVisitor = {
            id: parseInt(result.rows[0].id),
            name: result.rows[0].name,
            company: result.rows[0].company,
            type: result.rows[0].type,
            contact: result.rows[0].contact,
            signInTime: result.rows[0].sign_in_time,
            signOutTime: result.rows[0].sign_out_time
        };
        
        res.json(newVisitor);
    } catch (error) {
        console.error('Error adding visitor:', error);
        res.status(500).json({ error: 'Failed to add visitor' });
    }
});

// Sign out visitor
app.put('/api/visitors/:id/signout', async (req, res) => {
    try {
        const signOutTime = new Date();
        
        const result = await pool.query(
            `UPDATE visitors 
             SET sign_out_time = $1 
             WHERE id = $2 
             RETURNING *`,
            [signOutTime, req.params.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Visitor not found' });
        }
        
        const visitor = {
            id: parseInt(result.rows[0].id),
            name: result.rows[0].name,
            company: result.rows[0].company,
            type: result.rows[0].type,
            contact: result.rows[0].contact,
            signInTime: result.rows[0].sign_in_time,
            signOutTime: result.rows[0].sign_out_time
        };
        
        res.json(visitor);
    } catch (error) {
        console.error('Error signing out visitor:', error);
        res.status(500).json({ error: 'Failed to sign out visitor' });
    }
});

// Start server
initDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║   🏗️  Site Visitor Management Server                      ║
║                                                           ║
║   Server running on: http://localhost:${PORT}              ║
║                                                           ║
║   Database: ${process.env.DATABASE_URL ? '✅ Connected' : '⚠️  Using memory (data will be lost)'}                    ║
║                                                           ║
║   To access from other devices on your network:          ║
║   Find your computer's IP address and use:               ║
║   http://YOUR-IP-ADDRESS:${PORT}                          ║
║                                                           ║
║   Press Ctrl+C to stop the server                        ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
});
