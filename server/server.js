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

const customerLogin = require('./api/login');
app.use('/api', customerLogin);

const repairCenterLogin = require('./api/repairCenterLogin');
app.use('/api', repairCenterLogin);

const getCustomerDetails = require('./api/customerDetails');
app.use('/api', getCustomerDetails);

const storeVehicleDetails = require('./api/vehicleDetails');
app.use('/api', storeVehicleDetails);

const listVehicleDetails = require('./api/listVehicleDetails');
app.use('/api', listVehicleDetails);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
