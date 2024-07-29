const jwt = require('jsonwebtoken');
const pool = require('../db/mysql2');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secretkey');
        const [rows, fields] = await pool.execute('SELECT * FROM USER WHERE id = ?', [decoded.id]);
        if (rows.length === 0) {
            throw new Error();
        }
        req.user = rows[0];
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
};

module.exports = auth;