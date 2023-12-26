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

const getRepairCenterDetails = require('./api/repairCenterDetails');
app.use('/api', getRepairCenterDetails);

const storeVehicleDetails = require('./api/vehicleDetails');
app.use('/api', storeVehicleDetails);

const listVehicleDetails = require('./api/listVehicleDetails');
app.use('/api', listVehicleDetails);

const updateVehicleStatus = require('./api/updateVehicleStatus');
app.use('/api', updateVehicleStatus);

const addRepairCenterDetails = require('./api/addRepairCenterDetails');
app.use('/api', addRepairCenterDetails);

const addRepairCenterList = require('./api/getRepairCenters');
app.use('/api', addRepairCenterList);

const getUnverifiedRepairCentersList = require('./api/getUnverifiedRepairCentersList');
app.use('/api', getUnverifiedRepairCentersList);

const verifyRepairCenter = require('./api/verifyRepairCenter');
app.use('/api', verifyRepairCenter);

const checkVerificationStatus = require('./api/checkVerificationStatus');
app.use('/api', checkVerificationStatus);

const fetchVehicleList = require('./api/fetchVehicleList');
app.use('/api', fetchVehicleList);

const startRepairData = require('./api/startRepairData');
app.use('/api', startRepairData);

const getRepairHistory = require('./api/getRepairHistory');
app.use('/api', getRepairHistory);

const getVehicleDetails = require('./api/getVehicleDetails');
app.use('/api', getVehicleDetails);

const getCustomerRepairHistory = require('./api/getCustomerRepairHistory');
app.use('/api', getCustomerRepairHistory);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
