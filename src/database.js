const mysql = require ('mysql');
const { database } = require ('./keys');
const { promisify } = require ('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{

    if (err){

        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION CON LA BASE DE DATOS SE PERDIO');
        } else
        if (err.code ==='ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES')
        } else
        if (err.code === 'ECONNREFUSED'){
                console.error('LA CONEXION CON LA BASE DE DATOS FUE RECHAZADA')
        } else
        if (err.code === 'ER_ACCESS_DENIED_ERROR') 
                    console.error('ACCESO A LA DB DENEGADO', ' Usuario:'+database.user,' Password:'+database.password);
        else console.error(err);
    } else 
    
    if (connection){ connection.release();
       console.log('DB IS CONNECTED :vD')}
 return;

});

pool.query = promisify(pool.query);

module.exports = pool;

