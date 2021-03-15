import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import {UserModel} from './user.model';
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private usersService:UsersService, private router:Router) { }
  user= new UserModel("Customer","",0,"",0,"","");
  ngOnInit(): void {
  }
  addUser(){
    this.usersService.addUser(this.user);
    this.router.navigate(['products']);
  }
  mobileValidation(mobileNumber:any){
    if(mobileNumber.length!=10)
    {
      alert ("Invalid mobile number");
      this.router.navigate(['c-registeration']);
    }

  }
}
