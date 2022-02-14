import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:any = [];

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers(){
    this.userServ.getuser()
    // .pipe()
    .subscribe(
      res => this.users = res  
    );
  }

  // login(){
  //   this.userServ.login()
  //   .subscribe(
  //     res => console.log(res)
  //   );
  // }

}
