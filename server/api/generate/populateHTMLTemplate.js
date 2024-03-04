function populateHTMLTemplate(htmlTemplate, repairData) {
    
    let populatedHTML = htmlTemplate
        .replace('{{date}}', repairData.date)
        .replace('{{totalCost}}', repairData.totalCost);

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
