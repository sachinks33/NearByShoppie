import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import {UserModel} from '../customer-registration/user.model';
@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent implements OnInit {

  constructor(private usersService:UsersService, private router:Router) { }
  user= new UserModel("shop-admin","",0,"",0,"","");
  ngOnInit(): void {
  }
  addUser(){
    this.usersService.addUser(this.user);
    this.router.navigate(['products']);
  }

}
