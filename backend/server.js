const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json()); // app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'FARAZ',
  database: 'user' // Ensure this is correct and the database exists
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
  
  // Create table if it does not exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL
    );
  `;
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      process.exit(1);
    }
    console.log('Table created or already exists');
  });
});

// Route to handle registration
app.post('/register', async (req, res) => {
  const { name, email, password, company } = req.body;

  console.log(' data:', { name, email, password, company });

  if (!name || !email || !password || !company) {
    //console.log('Bad request: missing fields');
    return res.status(400).send('All fields are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, company) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, hashedPassword, company], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Registration failed');
      }
      res.status(200).send('Registration successful');
    });
  } catch (err) {
    console.error('Error hashing password:', err);
    res.status(500).send('Registration failed');
  }
});

// Route to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Received login data:', { email, password });

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).send('Login failed');
    }
    if (results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
