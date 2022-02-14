import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { productos } from '../../models/productos';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listprod: any = [];

  prod: productos = {
    idart: '',
    descart: '',
    prec_compra: '',
    prec_venta: '',
    cant_existente:''
  }
  // @ViewChild(MatTable) tableprod;

  constructor(private producServ: ProductosService) { }

  ngOnInit(): void {
    this.allProductos();
  }

  allProductos(){
    this.producServ.allproductos()
    .subscribe( 
      res=>{
        this.listprod = res;
        this.prod = res;
      }
      
    );
  }
  oneProductos(){
    this.producServ.oneproductos(this.prod.idart)
    .subscribe(
      res=>{
        this.listprod = res;
        // this.prod = res;
      }
    );
  }

}
