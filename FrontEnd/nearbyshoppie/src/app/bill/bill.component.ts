import { Component, OnInit } from '@angular/core';
import{BillService} from '../bill.service'
import{BillModel} from './bill.model'

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  shopName:any=localStorage.getItem('shoppingAt');
  public bills:any;
  constructor(private billService:BillService) { }

  ngOnInit(): void {
    if(localStorage.getItem('c-token'))
    {
      this.billService.getRecords(localStorage.getItem('c-mobile')).subscribe((data:any)=>{
      //this.bill=JSON.stringify(data)
      for(let i=0; i<data.length; i++){
        data[i].bill=JSON.parse(data[i].bill)
      }
      //  data[0].bill=JSON.parse(data[0].bill)
      this.bills=data;
      console.log(data)
      });
    }
    else if(localStorage.getItem('token'))
    {
      this.billService.getMRecords(localStorage.getItem('shoppingAt')).subscribe((data:any)=>{
      //this.bill=JSON.stringify(data)
      for(let i=0; i<data.length; i++){
        data[i].bill=JSON.parse(data[i].bill)
      }
      //  data[0].bill=JSON.parse(data[0].bill)
      this.bills=data;
      console.log(data)
      });
    }

  }
  adminLoggedIn(){
    return !!localStorage.getItem('token');
  }
  updateStatus(id:any){
    console.log("updating"+id)
    let value=((<HTMLInputElement>document.getElementById(id)).value);
    this.billService.updateStatus(id,value);
  }
  
}
