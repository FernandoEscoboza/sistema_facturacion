import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { detventas, ventas } from '../models/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  
  url = 'http://localhost:3000/ventas';

  constructor(private http: HttpClient) { }

  query_num_factura(){
    return this.http.get(this.url+'/query_num_factura/');
  }

  getone(id: any){
    return this.http.get(this.url+'/getone/'+id);
  }

  temp_create_detventas(det:detventas){
    return this.http.post(this.url+'/temp_create/', det);
  }

  temp_detventas(id: any){
    return this.http.get(this.url+'/temp_detventas/'+id);
  }

  delete_temp_detventas(idart:any, ventas:any){
    return this.http.post(this.url+'/delete/'+idart, ventas);
  }

  // Cancel or clean table temp_det_ventas 
  cancel_temp_detventas(id:any){
    return this.http.delete(this.url+'/cancel/'+id);
  }

  opensales(vent: ventas){
    return this.http.post(this.url+'/opensales/',vent);
  }

  savedsales(det:detventas){
    return this.http.post(this.url+'/savedsales/', det);
  }

  updatesales(id:any, ventas: ventas){
    return this.http.put(this.url+'/updatesales/'+id, ventas);
  }
}
