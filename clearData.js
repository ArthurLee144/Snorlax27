const db = require('./database/db.js');
// const data = require('./data.json')


db.clearDB((err, success) => {
  console.log('database cleared');
});



