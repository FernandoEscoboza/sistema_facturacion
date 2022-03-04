

const conn = require('../db_connection');
const {response, request} = require('express');
 

// module.exports =  allusers(res, req) {
//     conn.query('select * from articulos', (error, result) =>{
//         res.status(200).send({
//             result
//         })
//     })
// }

// module.exports = {
//     allUsers(res, req){
//         conn.query('select * from articuos', (err, result)=>{
//             res.status(200).json({
//                 result:result
//             });
//             res.status(404).json({
//                 message: errr
//             });
//             console.log(err)
//         });
//     } 
// }

// var controller = {

//   getall: async function(req, res){
//             await conn.query('select art.idart, art.descart, art.prec_venta, st.cant_existente from articulos art inner join stock st on art.idart = st.idart' , (err, result)=>{
//              if(err){
//                console.log('El error es: '+err);
//                throw err;
//               //  res.status(404).send({message: 'Error en la consulta'});
//              }           
//              console.log('Resultado '+result);
//              res.status(200).send(result);     
//             });

//         },
//   getone: async function(req, res){
//     const id = req.params.id;
//     await conn.query('select art.idart, art.descart, art.prec_venta, st.cant_existente from articulos art inner join stock st on art.idart = st.idart where art.idart=?',[id], (err, result)=>{
//       if(err){
//         console.log('El error es: '+err);
//         throw err;
//         // res.status(404).send(err);
//       }
//       console.log('Resultado '+result);
//       res.stauts(200).send(result);

//     });
//   },
  
//   createProduc: function(req, res){
//     let data = req.body;
//     conn.query('insert into articulos set ? ',[data],(err, result)=>{
//       if(err) throw err;
//       res.status(200).send({message:'Articulos Guardado'});
//     });
//   },
//   updateProduc: function(req, res){
//     let data = req.body;
//     let id = req.params.id;
//     conn.query('update articulos set ? where idart=?', [data, id], (err, result)=>{
//       if (err) throw err;
//       res.status(200).send(result);
//     });
//   },
//   delete: function(req,res){
//     let data = req.body;
//     let id = res.params.id;
//     conn.query('delete from articulos where idart=?'[id], (err, result)=>{
//       if(err) throw err;
//       res.stauts(200).send(result);
//     });
//   }

// }

// module.exports = controller;

class productos{

  constructor(){

  }

   getall(req, res){
     
             conn.query('select art.idart, art.descart, art.prec_venta, st.cant_existente from articulos art inner join stock st on art.idart = st.idart' , (err, result)=>{
                 if(err){
                   console.log('El error es: '+err);
                   throw err;
                  //  res.status(404).send({message: 'Error en la consulta'});
                 }           
                 console.log('Resultado '+result);
                 res.status(200).send(result);     
                });
    
              }

      getone(req, res){
        console.log(req.params.id);
        const id = req.params.id;
        // const desc = req.params.desc;
        conn.query('select art.idart, art.descart, art.prec_venta, st.cant_existente from articulos art inner join stock st on art.idart = st.idart where art.idart=?',[id], (err, result)=>{
          if(err){
            console.log('El error es: '+err);
            throw err;
            // res.status(404).send(err);
          }
          console.log('Resultado '+result);
          res.status(200).send(result);
    
        });
      }

      createProduc(req, res){
            let data = req.body;
            
            conn.query('insert into articulos set ? ',[data],(err, result)=>{
              if(err) throw err;
              res.status(200).send({message:'Articulos Guardado'});
            });
            conn.query('insert into stock set ? ',[data],(err, result)=>{
              if(err) throw err;
              res.status(200).send({message:'Articulos Guardado'});
            });
          }

          updateProduc(req, res){
            let data = req.body;
            let id = req.params.id;
            conn.query('update articulos set ? where idart=? or descart = ?', [data, id], (err, result)=>{
              if (err) throw err;
              res.status(200).send(result);
            });
          }
          delete(req,res){
            let data = req.body;
            let id = res.params.id;
            conn.query('delete from articulos where idart=?'[id], (err, result)=>{
              if(err) throw err;
              res.stauts(200).send(result);
            });
          }
}
const pro = new productos();
module.exports = pro;
    