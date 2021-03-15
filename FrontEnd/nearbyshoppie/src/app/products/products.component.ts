import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductModel } from './product.model';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import{BillService} from '../bill.service';
import { Router } from '@angular/router';
import { BillModel} from '../bill/bill.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  shopName:any=localStorage.getItem('shoppingAt');
  products:ProductModel[]=[];
  //billRecord:BillModel[]=[]
  //billRecord = new BillModel("","",0,0,"","");
  catProducts:ProductModel[]=[];
  public categoryList:Array<any> = [];
  public categoryName="All";
  public productQuantity:Array<any>=[{name:String,quantity:Number}];
  public billItem:Array<any>=[];
  public display=false;
  //bill elements
  public fullBill:Array<any>=[];
  public shop:any=localStorage.getItem('shoppingAt');
  public billDetails:any;
  public bd:any;
  public cName:any;
  public pincode:any;
  public cLocation:any;
  public cMobile: any;
  public status: any;
  public total:any;
  
  constructor(private router:Router, private productsService:ProductsService, public domSanitizer: DomSanitizer, public usersService:UsersService, private billing:BillService) {
  
   }  

  ngOnInit(): void {
    this.productsService.getProducts( localStorage.getItem('shoppingAt')).subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
      this.catProducts=this.products;
//category access
      for(let i=0; i<this.products.length; i++)
      {
        if(i==0)
        {
          this.categoryList[i]=this.products[i].category;
        }
        else{
          for(let j=0; j<this.categoryList.length;j++){
            if(this.categoryList[j]==this.products[i].category)
            {
              j=this.categoryList.length;
            }
            else if(j==this.categoryList.length-1)
            {
              this.categoryList[this.categoryList.length]=this.products[i].category;
            }
          }
        }
      }
    });
  }

//listing product by category
  categorizing(category:any){
    this.catProducts=[];
    this.categoryName=category;
    let j=0;
    for(let i=0; i<this.products.length;i++)
    {
      if(this.products[i].category==category)
      {
        this.catProducts[j]=this.products[i]
        j++;
      }
    }
  }

//billing
  addToBill(productDetails:any){
    if(productDetails.stock!=0)
    {
      let quantity:any=parseInt((<HTMLInputElement>document.getElementById(productDetails.productName)).value);
      let price=quantity*productDetails.price;
      //console.log(productDetails)
      this.productsService.updateStock(
        {productName:productDetails.productName,shopName:productDetails.shopName,stock:productDetails.stock},quantity);
      if(this.billItem.length==0)
      {
        this.billItem[this.billItem.length]=
          {"productName":productDetails.productName, "quantity":quantity+""+productDetails.unit,"price":price };
        console.log("added new1")
      }
      else
      {
        for(let i=0; i<this.billItem.length; i++)
        {
          
          if(this.billItem[i].productName==productDetails.productName)
          {
            console.log("upatate")
            let addQuantity:number=parseInt((this.billItem[i].quantity).split(" ",1));
            console.log("q"+addQuantity)
            price=price+this.billItem[i].price;
            quantity=  parseInt(quantity)+addQuantity;
            this.billItem[i]={"productName":productDetails.productName, "quantity":quantity+""+productDetails.unit,"price":price}
          }
          else if(i==this.billItem.length-1)
          {
            console.log("added new")
            this.billItem[this.billItem.length]=
              {"productName":productDetails.productName, "quantity":quantity+productDetails.unit,"price":price };
              i++
          }
        }
        console.log(this.billItem);
        
      }
      localStorage.removeItem('Bill');
      localStorage.Bill=JSON.stringify(this.billItem);
      console.log(localStorage.getItem('Bill'))
    }
    else{
      alert("Sorry, "+productDetails.productName+" is out of stock");
    }
  }

//bill
  bill(){
    if(!localStorage.getItem('Bill'))
    {
      alert("Basket is empty");
    }
    else if(this.display==false){
      this.display=true;
      this.billDetails=localStorage.getItem('Bill');
      this.bd=JSON.parse(this.billDetails);
      this.cName=localStorage.getItem('c-name');
      this.pincode=localStorage.getItem('c-code');
      this.cMobile=localStorage.getItem('c-mobile');
      this.cLocation=localStorage.getItem('c-location');
      this.shop=localStorage.getItem('shoppingAt');
      this.status="Processing";
      this.total=0;
      for(let i=0; i<this.bd.length; i++)
      {
        this.total=this.total+this.bd[i].price;
      }
      this.fullBill=[{status:this.status, cName:this.cName,pincode:this.pincode,cMobile:this.cMobile,cLocation:this.cLocation,shop:this.shop, bd:this.billDetails,total:this.total}]
      console.log(this.fullBill);
    }
      
    else
      this.display=false;
  }
  billHide(){
    this.display=false
  }

  proceed(){
    
    this.billing.addBillRecord(this.fullBill);
    localStorage.removeItem('Bill');
    let button=<HTMLInputElement>document.getElementById('buy');
    button.disabled=true;
  }

  removeProduct(id:any){
    console.log("oce move")
    this.productsService.removeProducts(id);
    this.router.navigate(['products'])
  }
  updateProduct(id:any){
    this.router.navigate(['products',id])
  }
  

}
