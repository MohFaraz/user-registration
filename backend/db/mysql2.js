const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "FARAZ",
  database: "user",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
async function main() {
  const connection = await pool.getConnection();
  console.log("Connected");
  const query =
    "CREATE TABLE IF NOT EXISTS USER (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255),company VARCHAR(255))";
  await connection.execute(query);
  connection.release();
}
main();
module.exports = pool;
