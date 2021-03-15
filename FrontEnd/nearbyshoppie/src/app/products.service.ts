import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ProductModel } from './products/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts(shoppingAt:any){
    return this.http.post("http://localhost:3000/products",{shoppingAt});
  }

  getShopProducts(shopName: any){
    return this.http.post("http://localhost:3000/shop-products",{shopName});
  }

  addProduct( formData:any){
    return this.http.post("http://localhost:3000/addproduct",formData).subscribe((data)=>{
      //alert("Product Successfully Added");
    });
  }

  updateProduct( products:any){
    //products=JSON.stringify(products)
    console.log(products)
    return this.http.post("http://localhost:3000/update-product",{products}).subscribe((data)=>{
      //alert("Product Successfully Added");
    });
  }

  shopList(cCode:any){
    return this.http.post("http://localhost:3000/shops",{cCode});
  }

  updateStock(productDetail:any, quantity:any){
    console.log("up")
    console.log(productDetail)
    return this.http.post("http://localhost:3000/update-stock",{productDetail,quantity}).subscribe((data)=>{
      //alert("Product Successfully Added");
    });
  }

  removeProducts(id:any){
    console.log("2 move")
    return this.http.post("http://localhost:3000/remove-product",{id}).subscribe((data)=>{
      //alert("Product Successfully Added");
    });
  }
  //get data for updation
  getData(id:any){
    return this.http.post("http://localhost:3000/get-data",{id});
  }
}
