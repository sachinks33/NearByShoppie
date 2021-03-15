import { Component, OnInit } from '@angular/core';
import {UserModel} from '../customer-registration/user.model';
import{UsersService} from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:UserModel[]=[];
  result: any;
  constructor(private usersService:UsersService, private router:Router) { }
  statusCode:any;
  logCred:any={mobile:0, password:""};
  ngOnInit(): void {
    
  }

  onLogin(){
    this.usersService.userData(this.logCred).subscribe((data:any)=>{
      //console.log(data.cToken)
      if(data.token!==undefined)
      { 
        localStorage.setItem('token',data.token);
        localStorage.setItem('shoppingAt',data.shopName);
        this.router.navigate(['products']);
        console.log(data.token);
      }
      else if(data.cToken=="Customer")
      {
        localStorage.setItem('c-token',data.cToken);
        localStorage.setItem('c-code',data.cCode);
        localStorage.setItem('c-name',data.cName);
        localStorage.setItem('c-mobile',data.cMobile);
        localStorage.setItem('c-location',data.cLocation);
        this.router.navigate(['shops']);
      }
    });
  }
}
