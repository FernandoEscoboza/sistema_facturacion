import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { productos, stock, almacen } from '../../models/productos';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listprod: any = [];
  listalmacen: any = [];

  descart: string = '';
  idart: any = [];

  prod: productos = {
    descart: '',
    prec_compra: '',
    prec_venta: ''
  }

    stock: stock = {
    idart:'',
    stock: '',
    punto_reorden: '',
    id_alm: '',
  }

  // almacen: almacen = {
  //   idalm:'',
  //   nom_alm:'',
  // }
  // @ViewChild(MatTable) tableprod;

  constructor(private producServ: ProductosService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // const params = this.ActivatedRoute.snapshot.params;
    this.allProductos();
    this.getalmacen();
  }

  allProductos(){
    this.producServ.allproductos()
    .subscribe( 
      res=>{
        this.listprod = res;
        // this.prod = res;
      }
      
    );
  }

  oneProductos(){
    this.producServ.oneproductos(this.descart)
    .subscribe(
      res=>{
        this.listprod = res ;
        // this.prod = res;
      }
    );
    if(this.descart == ''){
      this.allProductos();
    }

  }

  deleteProductos(id:any){
    this.producServ.deleteproductos(id)
    .subscribe(
      res=>{
        this.allProductos();
      },
      err=>{
        console.log(err);
      }
    );
    // this.allProductos();
  }

  saved(){

    this.producServ.saveproductos(this.prod)
    .subscribe(
      res=>{
        // this.stock.idart = res;
        
        this.idart = res;
        // alert(this.idart[0].auto_increment);
        this.stock.idart = this.idart[0].auto_increment;

        this.producServ.savestock(this.stock)
        .subscribe(
          res=>{
            this.allProductos();
            
            this.limpiar();
            alert('Producto Registrado');

           
          },
          err=>{
            console.log(err);
          }
        );

      },
      err=>{
        console.log(err);
      }
    );
  }

  update(){
    this.producServ.updateproductos(this.stock.idart, this.prod, this.stock)
    .subscribe( 
      res =>{
        this.allProductos();
            
          this.limpiar();
          alert('Producto Actualizado');
      },
      error=>{

      }
    );
   }

  seleccionar(idart:any, descart:any, prec_c:any, prec_v:any, stock:any, reorden:any, idalm:any){
    this.prod.descart = descart;
    this.prod.prec_compra = prec_c;
    this.prod.prec_venta = prec_v;

    this.stock.idart = idart;
    this.stock.stock = stock;
    this.stock.punto_reorden = reorden;
    this.stock.id_alm = idalm;
  }  

  limpiar(){
    this.prod.descart = '';
    this.prod.prec_compra = '';
    this.prod.prec_venta = '';
    this.stock.stock = '';
    this.stock.punto_reorden = '';
    this.stock.id_alm = '';   
  }

  validar(){
    if(this.prod.descart == ''){
      alert('No pueden haber campos vacios');
      return
    }
    else if(this.prod.prec_compra == 0){
      alert('No pueden haber campos vacios');
      return
    }
    else if(this.prod.prec_venta == 0){
      alert('No pueden haber campos vacios');
      return
    }
    else if(this.stock.stock == 0){
      alert('No pueden haber campos vacios');
      return
    }
    else if(this.stock.punto_reorden == 0){
      alert('No pueden haber campos vacios');
      return
    }
  }

  getalmacen(){
    this.producServ.getalmacen()
    .subscribe(
      result=>{
        this.listalmacen = result;
      }
    );
  }

}
