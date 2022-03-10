import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { productos } from '../../models/productos';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listprod: any = [];

  // idart: string = '';

  prod: productos = {
    idart: '',
    descart: '',
    prec_compra: 0,
    prec_venta: 0,
    cant_existente:0
  }
  // @ViewChild(MatTable) tableprod;

  constructor(private producServ: ProductosService,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.ActivatedRoute.snapshot.params;
    this.allProductos();
    
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
    this.producServ.oneproductos(this.prod.descart)
    .subscribe(
      res=>{
        this.listprod = res;
        // this.prod = res;
      }
    );
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
  

}
