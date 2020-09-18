const mysql = require('mysql2');
//Create a connection to the db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Golgot22',
    database: 'myAuthPlat',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connection established');
}); 

module.exports = connection;