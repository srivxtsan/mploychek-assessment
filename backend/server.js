const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

const DB_PATH = path.join(__dirname, 'database.json');

// Load DB on request so changes in database.json reflect immediately
const getDb = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (e) {
        console.error('Failed to load database.json:', e.message);
        return { users: [], records: { admin_view_all: [] } };
    }
};

// ==========================================
// API 1: LOGIN
// ==========================================
app.post('/api/login', (req, res) => {
    try {
        const { userId, password, role } = req.body;

        if (!userId || !password || !role) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        const db = getDb();
        const user = db.users.find(
            u => u.id === userId && u.password === password && u.role === role
        );

        if (user) {
            return res.json({
                success: true,
                userId: user.id,
                name: user.name,
                role: user.role
            });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials or role selection.' });
        }
    } catch (e) {
        console.error('Login error:', e.message);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// ==========================================
// API 2: RECORDS
// ==========================================
app.get('/api/records', (req, res) => {
    try {
        const { userId, role } = req.query;
        const delayTime = Math.max(0, parseInt(req.query.delay) || 0);

        let userRecords = [];
        const db = getDb();

        if (role === 'Admin') {
            userRecords = db.records.admin_view_all;
        } else {
            userRecords = db.records[userId] || [];
        }

        setTimeout(() => {
            res.json({
                success: true,
                delayApplied: `${delayTime}ms`,
                data: userRecords
            });
        }, delayTime);
    } catch (e) {
        console.error('Records error:', e.message);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 MPloyChek Backend running on port ${PORT}`);
    console.log(`   Database loaded: database.json`);
    console.log(`==================================================`);
});
