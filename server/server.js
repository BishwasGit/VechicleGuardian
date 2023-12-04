const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const registerRoute = require('./api/register');
app.use('/api', registerRoute);

const registerRouteRepairCenter = require('./api/registerRepairCenter');
app.use('/api', registerRouteRepairCenter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
