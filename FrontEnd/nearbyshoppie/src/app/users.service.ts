import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //login
  userData(logCred: any) {
    //alert("service");
    return this.http.post("http://localhost:3000/login",logCred);
  }

  constructor(private http:HttpClient, private router:Router) { }

  addUser(userData:any){
    return this.http.post("http://localhost:3000/c-registeration",{"user":userData}).subscribe((data:any)=>{
      //alert("Registeration Successfull");
      if(data.token!==undefined)
      {
        localStorage.setItem('token',data.token);
        localStorage.setItem('shoppingAt',data.shopName);
        this.router.navigate(['products']);
        //console.log(data.token);
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
      else{
        alert("Incorrect mobile number")
      }
    });
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  logout()
  {
    localStorage.clear();
    this.router.navigate(['login'])
  }
  logButton()
  {
    return !!(localStorage.getItem('token') || localStorage.getItem('c-token'));
    
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
