import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productos, stock } from '../models/productos'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'http://localhost:3000/productos';
  constructor(private http: HttpClient) { }

  allproductos(){
    return this.http.get(this.url+'/getall/');
  }

  oneproductos( id:any){
    // return this.http.get(this.url+'/getone/',id);
    return this.http.get(this.url+'/getone/'+ id);
  }

  saveproductos(pro: productos){
    return this.http.post(this.url+'/saveprod/', pro);
  }

  savestock(stock: stock){
    return this.http.post(this.url+'/savestock/',stock);
  }

  updateproductos(id:any, pro:productos, stock:stock){
    let data:any = [pro, stock];
    return this.http.put(this.url+'/update/'+id, data);
  }

  deleteproductos(id:any){
    return this.http.delete(this.url+'/delete/'+id);
  }

  getalmacen(){
    return this.http.get(this.url+'/getalmacen');
  }

  
  
}
