import { Injectable, Injector } from '@angular/core';
import{HttpInterceptor} from '@angular/common/http'
import { UsersService } from './users.service'
@Injectable({
  providedIn: 'root'
})
export class TockenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req:any,nxt:any)
  {
    let authService=this.injector.get(UsersService);
    let tokenizedReq= req.clone({
      setHeaders:{
        Authorization:`Bearer ${authService.getToken()}`
      }
    })
    return nxt.handle(tokenizedReq)
  }
}
