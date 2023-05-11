const fs = require('fs');

module.exports = () => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        err ? console.error(err) : console.log(JSON.parse(data));
    })
}