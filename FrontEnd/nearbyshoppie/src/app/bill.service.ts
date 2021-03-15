import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient, private router:Router) { }

  addBillRecord(fullBill:any){
    console.log("addbill")
    return this.http.post("http://localhost:3000/record-bill",{fullBill}).subscribe((data:any)=>{});
  }
  getRecords(datas:any){
    return this.http.post("http://localhost:3000/get-records",{datas})
  }
  getMRecords(datas:any){
    return this.http.post("http://localhost:3000/get-m-records",{datas})
  }
  updateStatus(id:any,status:any){
    return this.http.post("http://localhost:3000/update-status",{id,status}).subscribe((data:any)=>{});
  }
}
