import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productos } from '../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'http://localhost:3000/productos';
  constructor(private http: HttpClient) { }

  allproductos(){
    return this.http.get(this.url+'/getall/');
  }

  oneproductos(id:any){
    return this.http.get(this.url+'/getone/'+id);
  }

  saveproductos(pro: productos){
    return this.http.post(this.url+'/save/', pro);
  }

  updateproductos(id:any, pro:productos){
    return this.http.put(this.url+'/update/'+id, pro);
  }

  deleteproductos(id:any){
    return this.http.delete(this.url+'/delete/'+id);
  }
  
}
