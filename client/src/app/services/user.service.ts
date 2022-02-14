import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/' ;

  constructor(private htpp:HttpClient) { }

  getuser(){
    return this.htpp.get(this.url);
  }

  // login(){
  //   return this.htpp.post(this.url+'/login');
  // }
}
