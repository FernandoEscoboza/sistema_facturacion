import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/user' ;
  // url = 'https://fernandoescoboza.eshost.com.ar/server/user';

  constructor(private htpp:HttpClient,
    private jwthelper: JwtHelperService ) { }

  getuser(){
    return this.htpp.get(this.url+'/getlogin');
  }

  postlogin(user:any){
    return this.htpp.post(this.url+'/login/', user);
  }

  islogin(): boolean {
    const token:any = localStorage.getItem('token');
    if(this.jwthelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return true;
    }
    return false;
  }
}
