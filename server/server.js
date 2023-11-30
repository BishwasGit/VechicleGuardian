const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate file for database configuration
const app = express();
const cors = require('cors'); // Import the cors middleware


app.use(cors());
// Example endpoint
router.get('/api/getdata', (req, res) => {
  // Fetch data from MySQL
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error querying MySQL:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.use('/', router); // Attach the router to the app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
