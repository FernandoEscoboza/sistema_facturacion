
const mysql = require('mysql');

conn = mysql.createConnection({
    'host':'localhost',
    'database':'sistema_facturacion',
    'user':'root',
    'password':'',
    'port':'3306',
}, 
{multipleStatements: true}
);


conn.connect( error => {
    if(error){
        console.log('El error es: '+error)
    } else{
        console.log('DB Connected');
    }
});

module.exports = conn;
