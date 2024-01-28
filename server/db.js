const mysql = require('mysql2/promise');
const db = mysql.createPool({
  host: 'localhost',
  user: 'Bishwas',
  password: 'Bishwas@1',
  database: 'mobile_app',
  port: 3306,
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
