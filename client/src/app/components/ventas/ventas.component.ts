import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { VentasService } from '../../services/ventas.service';
import { ventas, detventas } from '../../models/ventas';

declare var $:any;  

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private VentasServ:VentasService, 
    private ProdServ:ProductosService,
    focusprod: ElementRef<HTMLInputElement> ) { }

  
 

  ngOnInit(): void {
    // Focus Input find
    $(document).ready(function() {
      $("#buscaridprod").focus();
    });

    // Input disabled the load moment 
    document.getElementById("iduser")?.setAttribute('disabled','true');
    document.getElementById("buscaridprod")?.setAttribute('disabled','true');
    document.getElementById("cantidad")?.setAttribute('disabled','true');

  
 
  }

  listventas: any = [];
  listproductos: any = [];
  listdet_ventas: any = [];

  idventas:number=0;
  idprod:any;
  prec_ventas: any;
  cantidad: any;
  check: boolean=false;

  ventas: ventas = {
    idventas:0 ,
    idcli: 0,
    iduser: 1,
    total: 0,
    idstatus_ventas:2
  } 

  detventas: detventas = {
    idventas: 0,
    idart: 0,
    cantidad: 0,
    prec_ventas: 0,
    importe: 0
  }


  // Sales Print
  printThisPage(){
    window.print();
    
  }

  // Open Sales
  opensales(){
    this.query_num_factura();
    this.Change_state_button();
  }

  // Cancel sales
  cancelsales(){
    this.ventas.idstatus_ventas = 3;
    this.ventas.idventas = this.idventas;
    
    this.VentasServ.savedsales(this.listdet_ventas).subscribe();
    this.VentasServ.updatesales(this.idventas, this.ventas).subscribe();

    this.VentasServ.cancel_temp_detventas(this.idventas)
    .subscribe();

    this.listdet_ventas = [];
    this.idventas = 0;
    this.ventas.total=0;

    document.getElementById("iduser")?.setAttribute('disabled','true');
    document.getElementById("buscaridprod")?.setAttribute('disabled','true');
    document.getElementById("cantidad")?.setAttribute('disabled','true');

   

  }

  // Get data the services temp_detventas
  get_temp_detventas(){
    this.VentasServ.temp_detventas(this.idventas)
    .subscribe(
      res=>{
        this.listdet_ventas = res;
        this.ventas.total=0;
        for(let i in this.listdet_ventas){
          this.ventas.total += this.listdet_ventas[i].importe; 
          console.log(this.ventas.total);
        }
      }
    );
  }

  // Get data the services query_num_factura for view the number sales
  query_num_factura(){
    this.VentasServ.query_num_factura()
    .subscribe(
      res=>{
        console.log(res);
        this.listventas = res;

        this.idventas = this.listventas[0].idventas;

        console.log(this.listventas);
        console.log(this.listventas[0].idventas);

        this.VentasServ.opensales(this.ventas)
        .subscribe();
      }
    );
  }


  // Get data the service getone for get products detaill
  oneproductos(){
    this.VentasServ.getone(this.idprod)
    .subscribe(
      res=>{
        this.listproductos = res;
        // this.listdet_ventas.push(this.listproductos);

        console.log(this.listdet_ventas);
        
        this.detventas.idventas = this.idventas;
        this.detventas.idart = this.listproductos[0].idart;
        this.detventas.prec_ventas = this.listproductos[0].prec_venta;
        this.detventas.cantidad = 1;

        this.VentasServ.temp_create_detventas(this.detventas)
        .subscribe(
          res=>{
            this.get_temp_detventas();
            
          }
        );
      }
    );
    this.listproductos = [];
    this.idprod ='';
  }

  // Seach by products code 
  buscar(){
    let cod = window.prompt("Codigo Productos");
    let list:any;

    this.VentasServ.getone(cod)
    .subscribe(
      res=>{
        list = res;

        this.idprod = list[0].idart;
        this.prec_ventas = list[0].prec_venta;
        this.cantidad = list[0].cantidad;
        // this.importe = list[0].importe;
      }
    );

    $("#cantidad").focus();
  }

  // Add products the sales
  agregar(){
    this.detventas.idart = this.idprod;
    this.detventas.cantidad = this.cantidad;
    this.detventas.prec_ventas = this.prec_ventas;
    this.detventas.idventas = this.idventas;
    // this.detventas.

    this.VentasServ.temp_create_detventas(this.detventas)
    .subscribe(
      res=>{
        
        // this.VentasServ.temp_detventas()
        // .subscribe(
        //   res=>{
        //     this.listdet_ventas = res;
        //     this.ventas.total=0;
            
        //     for(let i in this.listdet_ventas){
        //       this.ventas.total += this.listdet_ventas[i].importe; 
        //       console.log(this.ventas.total);
        //     }

        //   }
        // );
        this.get_temp_detventas();
      }
    );

    this.idprod ='';
    this.cantidad = '';
    this.prec_ventas = '';

    $("#buscaridprod").focus();
  }
  
  
  eliminarprod(idart:any, desc:any){
    let cant = window.confirm('Desea eliminar el articulo: '+desc);
   
    if(cant){

      this.ventas.idventas = this.idventas;
      
      // alert(idart);
      this.VentasServ.delete_temp_detventas(idart, this.ventas)
      .subscribe(
        res=>{
          this.get_temp_detventas();
        },
        err=>{
          console.log(err);
        }
      );    
    }

    $("#buscaridprod").focus();
  }

  // Change state element input
  Change_state_button(){
    const inputiduser = document.getElementById("iduser");
    const inputbsucarprod = document.getElementById("buscaridprod");
    const inputcant = document.getElementById("cantidad");

    inputiduser?.removeAttribute('disabled');
    inputbsucarprod?.removeAttribute('disabled');
    inputcant?.removeAttribute('disabled');

  }

  savedsales(){
    this.ventas.idstatus_ventas = 2;
    this.ventas.idventas = this.idventas;

    this.VentasServ.savedsales(this.listdet_ventas).subscribe();
    this.VentasServ.updatesales(this.idventas, this.ventas).subscribe();
    this.VentasServ.cancel_temp_detventas(this.idventas).subscribe();
    this.Change_state_button();
    
    this.listdet_ventas = [];
    this.idventas = 0;
    this.ventas.total=0;

    document.getElementById("iduser")?.setAttribute('disabled','true');
    document.getElementById("buscaridprod")?.setAttribute('disabled','true');
    document.getElementById("cantidad")?.setAttribute('disabled','true');
  }

}
