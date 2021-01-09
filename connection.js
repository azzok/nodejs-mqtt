const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mqtt_data'
});
console.log("MySQL Connection");
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
module.exports = connection; 