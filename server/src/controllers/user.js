
const conn = require('../db_connection');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

class users{

    construtor(){
        
    }

    // ensureToken(req, res, next){
    //     const bearerHeader = req.headers['authorization'];
    //     if( typeof bearerHeader !== 'undefined'){
    //         console.log('Bearer: '+bearerHeader);
    //         const bearer = bearerHeader.split(' ');
    //         const bearerToken = bearer[1];
    //         req.token =bearerToken;
    //         next();
    //     } else{
    //         res.sendStatus(404);
    //     }
    // }

    postlogin(req, res){
        const {user, password } = req.body;
        // let user = req.params.user;
        // let password = req.params.password;
        let sql = 'select iduser, user, password from usuarios where user=? and password=? ';

        conn.query(sql, [user, password], (err, result) =>{
            if(err) throw err;
            console.log('Los datos consultados son: '+result);

            let data = JSON.stringify(result[0]);
            let token = jwt.sign(data, 'my_secret');
            // let token = jwt.sign(result, process.env.TOKEN_SECRET );
            let iduser = result[0]['iduser'];
            // let iduser = jwt.sign( result[0].iduser, 'my_user');
            // jwt.
            console.log('Los datos consultados son: '+data);
            console.log('El id es : '+ result[0].iduser);
            // console.log(jwt_payload);

            res.json({
                token,
                iduser
            });
        });
    }

    getlogin(req, res){
        let sql = 'select * from usuarios';

        conn.query(sql, (err, result)=>{
            if(err) throw err;
            res.status(200).json(result);
        });
    }
}

const us = new users();

module.exports = us;

