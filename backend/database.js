const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ciberconvivencia'
});

connection.connect((err) => {
  if (err) {
    console.log('Error de conexión:', err);
  } else {
    console.log('Base de datos conectada');
  }
});

module.exports = connection;
