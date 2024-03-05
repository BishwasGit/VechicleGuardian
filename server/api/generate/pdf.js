const fs = require('fs');
const { promisify } = require('util');
const pdf = require('html-pdf');
const { populateHTMLTemplate } = require('./populateHTMLTemplate');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); 
const { db } = require('../../db');
require('dotenv').config(); 
const readFileAsync = promisify(fs.readFile);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function generatePDFInvoice(repairData, callback) {
    try {
        const vehicleDetailsId = repairData.vehicleId
        const workerId = repairData.repaircenter_workers_id
        
        const vehicleandcustomerDetails = await db.execute(`SELECT vd.*,cu.* FROM vehicle_details vd INNER JOIN customer_users cu ON vd.customer_id = cu.customer_id WHERE vd.vehicleDetails_id = ?`,[vehicleDetailsId]);

        const repaircenterworkerDetails = await db.execute(`SELECT * FROM repaircenter_workers WHERE repaircenter_workers_id = ?`,[workerId])
       
        const getRepaircenterId = repaircenterworkerDetails[0][0].repaircenters_id;

        const repaircenterDetails = await db.execute(`SELECT rw.* , rc.* FROM repaircenter_workers rw INNER JOIN repair_centers rc ON  rw.repaircenters_id WHERE rc.repaircenters_id = ? `,[getRepaircenterId]);

        const templatePath = `${process.env.APP_LOCATION}/template/invoice.html`;
        const htmlTemplate = await readFileAsync(templatePath, 'utf-8');
        const populatedHTML = populateHTMLTemplate(htmlTemplate, repairData, vehicleandcustomerDetails, repaircenterworkerDetails, repaircenterDetails );
        pdf.create(populatedHTML).toBuffer(async function(err, buffer) {
            if (err) throw err;
            console.log('PDF invoice created successfully');
            const cloudinaryUpload = cloudinary.uploader.upload_stream(
              { folder: 'invoice' }, 
              async function(error, result) {
                if (error) throw error;
                const { vehicleId, repaircenter_workers_id, date, totalCost, changesMade, completion_time } = repairData;
                const repairDataQuery = 'INSERT INTO repair_data (vehicleDetails_id, repaircenter_workers_id, repair_date, total_cost, changes_made, completion_time, pdf_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
                await db.execute(repairDataQuery, [vehicleId, repaircenter_workers_id, date, totalCost, changesMade, completion_time, result.secure_url]);
                callback({ success: true, message: 'Repair data and PDF invoice uploaded successfully'});
              }
            );
            streamifier.createReadStream(buffer).pipe(cloudinaryUpload);
        });
    } catch (error) {
        console.error('Error generating PDF invoice:', error);
    }
}

module.exports = { generatePDFInvoice };
