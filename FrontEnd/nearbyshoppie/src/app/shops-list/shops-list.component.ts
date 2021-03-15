import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../customer-registration/user.model';
import {ProductsService} from '../products.service'
import { ProductModel } from '../products/product.model';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {
  shops:UserModel[]=[];
  products:ProductModel[]=[];
  constructor(private productsService: ProductsService , private router:Router) { }

  ngOnInit(): void {
    this.productsService.shopList(localStorage.getItem('c-code')).subscribe((data)=>{
      this.shops=JSON.parse(JSON.stringify(data));
    });
  }

  currentShop(shopName: string){
    localStorage.removeItem('shoppingAt');
    localStorage.setItem('shoppingAt', shopName)
    this.router.navigate(['products']);
  }
  // shopProduct(shopName:string){
  //   this.productsService.getShopProducts(shopName).subscribe((data:any)=>{
  //     this.products=JSON.parse(JSON.stringify(data));
  //     this.router.navigate(['products']);
  //   });
  // }

}
