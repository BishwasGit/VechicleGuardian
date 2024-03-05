function populateHTMLTemplate(htmlTemplate, repairData, vehicleandcustomerDetails, repaircenterworkerDetails, repaircenterDetails) {
    
    let populatedHTML = htmlTemplate
        .replace('{{date}}', repairData.date)
        .replace('{{totalCost}}', repairData.totalCost)
        .replace('{{customerName}}', vehicleandcustomerDetails[0][0].username)
        .replace('{{customerContact}}', vehicleandcustomerDetails[0][0].phone)
        .replace('{{VehicleNumber}}', vehicleandcustomerDetails[0][0].vehicle_number)
        .replace('{{VehicleModel}}', vehicleandcustomerDetails[0][0].vehicle_model)
        .replace('{{repairWorker}}', repaircenterworkerDetails[0][0].worker_name)
        .replace('{{repaircenterName}}', repaircenterDetails[0][0].repaircenter_fname)
        .replace('{{repaircenterAddress}}', repaircenterDetails[0][0].address)

    const changesMadeArray = JSON.parse(repairData.changesMade);

    let changesTableContent = '';

    changesMadeArray.forEach(change => {
        changesTableContent += `
            <tr>
                <td>${change.changesMade}</td>
                <td>${change.cost}</td>
            </tr>
        `;
    });

    const changesTablePlaceholder = '{{#each changes_made}}';
    const changesTableEndPlaceholder = '{{/each}}';

    populatedHTML = populatedHTML
        .replace(changesTablePlaceholder, changesTableContent)
        .replace(changesTableEndPlaceholder, '');

    return populatedHTML;
}

module.exports = { populateHTMLTemplate };
