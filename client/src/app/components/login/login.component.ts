import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { users } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userlist:any = [];

  users: users = {
    user: '',
    password: ''
  }

  constructor( private userServ: UserService,
    private router: Router ) { }

  ngOnInit(): void {
  }

  login(){
    this.userServ.postlogin(this.users)
    .subscribe(
      (res:any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        // localStorage
        console.log(res);
        this.router.navigate(['productos']);
        // this.router.navigate(['ventas']);
      }
    );
  }

  

}
