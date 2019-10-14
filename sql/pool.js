const mysql = require('mysql');
const pool = mysql.createPool({
  host     : '47.100.167.231',
  user     : 'root',
  password : '9872014skylove',
  database : 'blog'
});
 
module.exports = pool;