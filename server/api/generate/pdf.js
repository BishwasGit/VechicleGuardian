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
        const templatePath = `${process.env.APP_LOCATION}/template/invoice.html`;
        const htmlTemplate = await readFileAsync(templatePath, 'utf-8');
        const populatedHTML = populateHTMLTemplate(htmlTemplate, repairData);
        pdf.create(populatedHTML).toBuffer(async function(err, buffer) {
            if (err) throw err;
            console.log('PDF invoice created successfully');
            const cloudinaryUpload = cloudinary.uploader.upload_stream(
              { folder: 'invoice' }, 
              async function(error, result) {
                console.log('result from cloudinary',result);
                if (error) throw error;
                console.log('PDF uploaded to Cloudinary:', result.secure_url);
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
