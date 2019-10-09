var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.100.167.231',
  user     : 'root',
  password : '9872014skylove',
  database : 'blog'
});
 
connection.connect();
 
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});