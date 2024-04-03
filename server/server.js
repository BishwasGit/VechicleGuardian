const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//register & login 
const registerRoute = require('./api/register');
app.use('/api', registerRoute);
const Login = require('./api/login');
app.use('/api', Login);


//customer Side
const getCustomerDetails = require('./api/customers/customerDetails');
app.use('/api', getCustomerDetails);
const storeVehicleDetails = require('./api/customers/vehicleDetails');
app.use('/api', storeVehicleDetails);
const updateVehicleStatus = require('./api/customers/updateVehicleStatus');
app.use('/api', updateVehicleStatus);
const addRepairCenterList = require('./api/customers/getRepairCenters');
app.use('/api', addRepairCenterList);
const getCustomerRepairHistory = require('./api/customers/getCustomerRepairHistory');
app.use('/api', getCustomerRepairHistory);
const listVehicleDetails = require('./api/customers/listVehicleDetails');
app.use('/api', listVehicleDetails);
const getVehicleDetails = require('./api/customers/getVehicleDetails');
app.use('/api', getVehicleDetails);
const storevehicleincomeexpenses = require('./api/customers/storevehicleincomeexpenses');
app.use('/api', storevehicleincomeexpenses);
const getCustomerDetailsUsingVehicleDetailsId = require('./api/getCustomerDetailsUsingVehicleDetailsId')
app.use('/api', getCustomerDetailsUsingVehicleDetailsId);

//for chat feature
const repairCenterWorker = require('./api/customers/repairCenterWorker');
app.use('/api', repairCenterWorker);
const repairData = require('./api/customers/chatScreenCustomer');
app.use('/api', repairData);
const repaircentersData = require('./api/customers/getSingleRepairCenter');
app.use('/api', repaircentersData);
const repaircentersMessageScreenData = require('./api/repaircenters/chatScreenRepairCenter');
app.use('/api', repaircentersMessageScreenData);


//send and receive messages 
const sendMessage = require('./api/chat/sendMessage');
app.use('/api', sendMessage);
const messages_cr = require('./api/chat/messages_cr');
app.use('/api', messages_cr);

//from repaircenter to customer
const getRepairCenterDetailsUsingWorkerId = require('./api/getRepairCenterDetailsUsingWorkerId');
app.use('/api', getRepairCenterDetailsUsingWorkerId);
const downloadBill = require('./api/downloadBill');
app.use('/api', downloadBill);

//repair centers side

const registerRouteRepairCenter = require('./api/repaircenters/registerRepairCenter');
app.use('/api', registerRouteRepairCenter);
const repairCenterLogin = require('./api/repaircenters/repairCenterLogin');
app.use('/api', repairCenterLogin);
const getRepairCenterDetails = require('./api/repaircenters/repairCenterDetails');
app.use('/api', getRepairCenterDetails);
const addRepairCenterDetails = require('./api/repaircenters/addRepairCenterDetails');
app.use('/api', addRepairCenterDetails);
const checkVerificationStatus = require('./api/repaircenters/checkVerificationStatus');
app.use('/api', checkVerificationStatus);
const fetchVehicleList = require('./api/repaircenters/fetchVehicleList');
app.use('/api', fetchVehicleList);
const startRepairData = require('./api/repaircenters/startRepairData');
app.use('/api', startRepairData);
const addVacancyDetails = require('./api/repaircenters/addVacancyDetails');
app.use('/api', addVacancyDetails);
const getUsersRepairCenters = require('./api/repaircenters/getUsersRepairCenters');
app.use('/api', getUsersRepairCenters);
const addRepairParts = require('./api/repaircenters/addRepairParts');
app.use('/api', addRepairParts);
const repairHistory = require('./api/repaircenters/repairHistory');
app.use('/api', repairHistory);
const repairCenterLists = require('./api/repaircenters/fetchrepaircentersList');
app.use('/api', repairCenterLists);

//admin side
const getUnverifiedRepairCentersList = require('./api/admin/getUnverifiedRepairCentersList');
app.use('/api', getUnverifiedRepairCentersList);
const verifyRepairCenter = require('./api/admin/verifyRepairCenter');
app.use('/api', verifyRepairCenter);


//workers side
const addWorkers = require('./api/workers/addWorkers');
app.use('/api', addWorkers);
const workerLogin = require('./api/workers/workerLogin');
app.use('/api', workerLogin);
const getWorkerDetails = require('./api/workers/getWorkerDetails');
app.use('/api', getWorkerDetails);

//check switch profile logic
const checkRepairCenterUsername = require('./api/checkSwitchProfile/checkRepairCenterUsername');
app.use('/api', checkRepairCenterUsername);
const checkRepairCenterSellerUsername = require('./api/checkSwitchProfile/checkRepairCenterSellerUsername');
app.use('/api', checkRepairCenterSellerUsername);
const checkCustomerUsername = require('./api/checkSwitchProfile/checkCustomerUsername');
app.use('/api', checkCustomerUsername);


//imageupload 
const vehicleImageupload = require('./api/imageUpload/vehicleImageupload');
app.use('/api',vehicleImageupload);
const billBookImage = require('./api/imageUpload/billBookImage');
app.use('/api',billBookImage);
const repaircenterDocuments = require('./api/repaircenters/repaircenterDocuments');
app.use('/api',repaircenterDocuments);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
