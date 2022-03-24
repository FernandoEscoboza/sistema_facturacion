

const { json } = require('body-parser');
const conn = require('../db_connection');
 
class productos{

  constructor(){

  }

  getall(req, res){

    let sql = 'select art.idart, art.descart, art.prec_compra, art.prec_venta, st.stock, st.punto_reorden, alm.idalm, alm.nom_alm ' 
    +' from  articulos art '
    + 'inner join stock st on art.idart = st.idart '
    +' left outer join almacen alm on st.id_alm = alm.idalm '
    +' order by art.descart';



    conn.query(sql , (err, result)=>{
      if(err){
        console.log('El error es: '+err);
        throw err;
       //  res.status(404).send({message: 'Error en la consulta'});
      }           
      // console.log('Resultado '+result);s
      res.status(200).send(result);     
    });
  }

  getone(req, res){
    console.log(req.params.id);
    const id = req.params.id;
    let sql = 'select art.idart, art.descart, art.prec_compra, art.prec_venta, st.stock, st.punto_reorden, alm.idalm, alm.nom_alm '
    +' from articulos art '
    +' inner join stock st on art.idart = st.idart'
    +' left join almacen alm on st.id_alm = alm.idalm '
    +' where art.descart like "%'+id+'%" or art.idart like "%'+id+'%"'
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

  createProduc(req, res){
    let pro = req.body;
    let sql = 'select auto_increment from information_schema.TABLES where TABLE_SCHEMA = "sistema_facturacion" and TABLE_NAME = "articulos";  ';
    
    conn.query(sql,(err, result)=>{
      if(err) throw err;
      console.log(result);
      res.status(200).send(result);
    });
  
    let sql2 = ' insert into articulos set ?';

    conn.query(sql2,[pro],(err, result)=>{
      if(err) throw err;
    });
    
  }
      
  createStock(req, res){
    let stock = req.body;
    
  
    conn.query('insert into stock set ? ',[stock],(err, result)=>{
      if(err) throw err;
      res.status(200).send({message:'Stock Guardado'});
    });
  }

  updateProduc(req, res){
    let data = req.body;
    let id = req.params.id;  

    let descart = data[0].descart;
    let prec_c = data[0].prec_compra;
    let prec_v = data[0].prec_venta;
    let idart = data[1].idart;
    let stock = data[1].stock;
    let punto_reorden = data[1].punto_reorden;
    let id_alm = data[1].id_alm;
  
    console.log(id);
    console.log(data);
    console.log(data[0].descart);
    console.log(data[1].stock);
   
    // data.forEach(element => {
    //   console.log(data[element]);
    // });

    let sql = 'UPDATE articulos art INNER JOIN stock st '
    +' on art.idart = st.idart '
    +' set art.descart=?, art.prec_compra=?, art.prec_venta=?,  '
    +' st.stock=?, st.punto_reorden=?, st.id_alm=? '
    +'  WHERE art.idart = ?;'
    // let sql2 = 'update  ';

    let values = [descart, prec_c, prec_v, stock, punto_reorden, id_alm, idart ];

    conn.query(sql, values, (err, result)=>{
      if (err){
        console.log('El error es: '+err);
        throw err;
      }
      res.status(200).send(result);
      // console.log('Resultado '+result);
    });
  }

  delete(req,res){
    const id = req.params.id;
    conn.query('call delete_productos(?)',[id], (err, result)=>{
      if (err){
        console.log('El error es: '+err);
        throw err;
      }
      res.status(200).send(result);
      // console.log('Resultado '+result);
    });
  }

  getalmacen(req, res){
    let sql = 'select idalm, nom_alm from almacen';

    conn.query(sql,(err, result)=>{
      if (err) throw err;

      res.status(200).send(result);
    });
  }
}
const pro = new productos();
module.exports = pro;
    

