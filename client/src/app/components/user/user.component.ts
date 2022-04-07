import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { users } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userlist:any = [];

  users: users = {
    user: '',
    password: ''
  }

  constructor(
    private userServ: UserService,
    private router: Router ) { }

  ngOnInit(): void {
    // this.getusers();
  }

  // }

  login(){
    this.userServ.postlogin(this.users)
    .subscribe(
      (res:any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        console.log(res);
        this.router.navigate(['productos']);
        this.router.navigate(['ventas']);
      }
    );
  }

}
