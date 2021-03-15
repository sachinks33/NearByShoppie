import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductModel } from '../products/product.model';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  shopName:any=localStorage.getItem('shoppingAt');
  image:any;
  constructor(private productService: ProductsService, private router: Router) { }
  product = new ProductModel("","",this.shopName,"","","","","","");
  ngOnInit(): void {
  }

  selectImage(event:any){
    this.image=<File>event.target.files[0];
    console.log(this.image.name);
  }

  addProducts(){
    const formData =new FormData();
    formData.append('productImage', this.image, this.image.name);
    formData.append("productName",this.product.productName);
    formData.append("shopName",this.product.shopName);
    formData.append("category",this.product.category);
    formData.append("price",this.product.price);
    formData.append("quantity",this.product.quantity);
    formData.append("stock",this.product.stock);
    formData.append("unit",this.product.unit);
    
    //console.log(formData.has('productName'));
    this.productService.addProduct(formData);
    this.router.navigate(['products']);
  }

}
