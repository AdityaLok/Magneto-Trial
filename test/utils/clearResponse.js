const fs = require('fs');
const path = require('path');

const clearResponse = (fileName) => {
    const logPath = path.join(__dirname, `../apiResponse/${fileName}}`);
    fs.writeFileSync(logPath, '', 'utf-8');
};

module.exports = { clearResponse };