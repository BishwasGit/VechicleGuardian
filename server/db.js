const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});


db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to MySQL:', error);
  });

module.exports = {
  db,
};
