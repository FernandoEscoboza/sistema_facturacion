
const { cookie } = require('express/lib/response');
const conn = require('../db_connection');

class ventas{

    constructor(){

    }

    // Get or calculated number sales
    query_num_factura(req, res){
      
        // let sql = "select max(idventas) as idventas from temp_det_ventas";

        // conn.query(sql, (err, result)=>{
        //     console.log(result);

        //     if(err) throw err;
            
        //     if(result!=undefined){
        //         console.log("Valor no undefined");
        //         let num = 1;
        //         // data.idventas += result.idventas;
        //         result[0].idventas += 1;

        //         // console.log(data.idventas);
        //         console.log(result[0].idventas);
        //         // console.log(data);
        //         console.log(result);
        //         res.status(200).send(result);
        //     } else{
        //         console.log("Valor undefined");
        //         let sql_id = 'select auto_increment as idventas from information_schema.TABLES where TABLE_SCHEMA = "fernand1_sistema_facturacion" and TABLE_NAME = "ventas";';
        //         // let sql = 'select auto_increment from information_schema.TABLES where TABLE_SCHEMA = "fernand1_sistema_facturacion" and TABLE_NAME = "articulos";  ';
    
        //         conn.query(sql_id, (err, result)=>{
        //             if(err) throw err;
        //             console.log(result);
        
        //             console.log(result);
        //             res.status(200).send(result);
        
        //         });
        
        //     }
        // });

        // let sql_id = 'select auto_increment as idventas from information_schema.TABLES where TABLE_SCHEMA = "fernand1_sistema_facturacion" and TABLE_NAME = "ventas";';
        let sql_id = 'select auto_increment as idventas from information_schema.TABLES where TABLE_SCHEMA = "sistema_facturacion" and TABLE_NAME = "ventas";  ';

        conn.query(sql_id, (err, result)=>{
            if(err) throw err;
            console.log(result);

            console.log(result);
            res.status(200).send(result);

            

        });
        
    }

    //-----------------------Sales Process-----------------

    opensales(req, res){
      let data = req.body;
      let idcli = data.idcli;
      let iduser = data.iduser;
      
      let sql = "insert into ventas(fecha_ventas, idstatus) values(	current_timestamp(), 1)";

      conn.query(sql,(err, result)=>{
          if(err) throw err;
          res.status(200).send({message:"Factura creada"});
          console.log("Factura creada");
      });
    }

    savedsales(req, res){
        let data = req.body;
        console.log("Datos detalles ventas");
        console.log(data);

        for(let i=0; i<data.length;i++){
            // console.log(data[i].idart);
            console.log(data[i]);
            let idventas = data[i].idventas;
            let idart = data[i].idart;
            let cantidad = data[i].cantidad;
            let prec_ventas = data[i].prec_ventas;
            let importe = data[i].importe;

            let sql='insert into det_ventas(idventas, idart, cantidad, prec_ventas, importe) '
            +' values(?,?,?,?,?)';

            let values = [idventas, idart, cantidad, prec_ventas, importe];
            conn.query(sql, values, (err, result)=>{
                if(err) throw err;
                // res.status(200).send({message:"Factura creada"});
                console.log('Guardado');
            });
        }
    }
    
    updatesales(req, res){
        let id = req.params.id;
        let data = req.body;
        let idventas = data.idventas;
        let idcli = data.idcli;
        let iduser = data.iduser;
        let total = data.total;
        let idstatus_ventas = data.idstatus_ventas;

        console.log("Datos para actualizar:\t");
        console.log(data);


        let sql='update ventas set total = ?, id_cli = ?, iduser = ?, idstatus = ?  where idventas = ?';
        
        conn.query(sql, [total, idcli, iduser, idstatus_ventas, idventas], (err,result)=>{
            if(err) throw err;
            console.log("Datos actualizado");
        });

    }
    
    getone(req, res){
        // console.log(req.params.id);
        const id = req.params.id;
        let sql = 'select art.idart, art.descart, art.prec_compra, art.prec_venta, st.stock, st.punto_reorden, alm.idalm, alm.nom_alm '
        +' from articulos art '
        +' inner join stock st on art.idart = st.idart'
        +' left join almacen alm on st.id_alm = alm.idalm '
        // +' where art.idart like "%'+id+'%"'
        +' where art.idart ='+id+''
        +' order by art.descart '; 
    
        conn.query(sql, (err, result)=>{
          if(err){
            console.log('El error es: '+err);
            throw err;
            // res.status(404).send(err);
          }
          // console.log('Resultado '+result);
          res.status(200).send(result);
    
        });
      }  

    // --------------Funciones para la mapinulacion de la tabla temp_det_ventas-------------
    
    // Insert or update articles in the table temp_det_ventas
    create_temp_detventas(req, res){
        let data = req.body;
        console.log(data);

        let idventas = data.idventas;
        let idart = data.idart;
        let cantidad = data.cantidad;
        let prec_ventas = data.prec_ventas;
        let importe = prec_ventas * cantidad;
        data.importe = importe;

        let sqlquery = 'select * from temp_det_ventas where idart = ? and idventas = ? ';
            
        conn.query(sqlquery, [idart, idventas], (err, result)=>{
            if(err) throw err;

            if(result.length>0){
                console.log("Contiene datos");

                let idv = result[0].idventas;
                let ida = result[0].idart;
                let cant = result[0].cantidad;
                let prec_v = result[0].prec_ventas;
                let importe2 = 0;

                cant += parseInt(cantidad);
                importe2 = cant * prec_v;
                
                 let sql = 'update temp_det_ventas set cantidad=?, prec_ventas=?, importe=? ' 
                    +' where idart = ? and idventas = ? ';

                conn.query(sql, [cant, prec_v, importe2, ida, idv], (err, result)=>{
                    if(err) throw err;
                    res.status(200).send({message:'Datos actualizados en tabla temp_det_ventas'});
                });
            } else{
                
                let sql = 'insert into temp_det_ventas set ?';

                conn.query(sql, [data], (err, result)=>{
                    if(err) throw err;
                    res.status(200).send({message:'Datos guardos en tabla temp_det_ventas'});
                });
            }
        });        
    }


    get_temp_detventas(req,res){
        let idventas = req.params.idventas;
        let sql = 'select tdv.*, art.descart from temp_det_ventas as tdv inner join articulos art '
        +' on tdv.idart = art.idart '
        +' where tdv.idventas = '+idventas;
        // let sql = 'select tdv.*, art.descart from temp_det_ventas as tdv, articulos art ';

        conn.query(sql, (err, result)=>{
            if(err) throw err;
            res.status(200).send(result);
        });
    }

    delete_temp_detventas(req, res){
        let id = req.params.id;
        let data = req.body;
        let idventas = data.idventas;

        console.log(id);
        console.log(data);
        // let id = data.idart;

        let sql = "delete from temp_det_ventas where idart = ? and idventas = ?";

        conn.query(sql, [id, idventas], (err, result)=>{
            
            res.status(200).send({message:"Elemento eliminado"});
        });
    }

    // Cancel or clean table temp_det_ventas 
    cancel_temp_detventas(req, res){
        let id = req.params.id;

        let sql = "delete from temp_det_ventas where idventas=?"

        conn.query(sql, [id], (err, result)=>{
            res.status(200).send({message:"Factura No procesada"});
        });
    }

}

const objVentas = new ventas();

module.exports = objVentas;


