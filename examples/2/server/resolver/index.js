const fs = require('fs');
const path = require('path');
const resolvers = [];

function loadModule(dir = __dirname) {
    fs.readdirSync(dir).forEach(function(filename) {
        const filePath = path.join(dir, filename);
        if (fs.statSync(filePath).isDirectory()) {
            loadModule(filePath);
            return;
        }
        if (!/\.js$/.test(filename) || 'index.js' === filename) {
            return;
        }
        resolvers.push(require(filePath));
    });
}
loadModule();

module.exports = resolvers;
