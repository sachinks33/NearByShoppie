import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UsersService} from './users.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UsersService, private router:Router){}
  canActivate():boolean
  {
    if(this.userService.loggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
