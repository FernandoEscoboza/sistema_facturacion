
const mysql = require('mysql');

// Conection local
conn = mysql.createConnection({
    'host':'localhost',
    'database':'sistema_facturacion',
    'user':'root',
    'password':'',
    'port':'3306',
}, 
{multipleStatements: true}
);

// Conection remote
// conn = mysql.createConnection({
//     'host':'23.111.181.122',
//     'database':'fernand1_sistema_facturacion',
//     'user':'fernand1_fescobozam',
//     'password':'jesus1999$',
//     'port':'3306',
// }, 
// {multipleStatements: true}
// );


conn.connect( error => {
    if(error){
        console.log('El error es: '+error)
    } else{
        console.log('DB Connected');
    }
});

module.exports = conn;
