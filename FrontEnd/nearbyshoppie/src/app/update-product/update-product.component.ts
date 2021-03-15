import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductModel } from '../products/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  public products:any;
  id:any;
  shopName:any=localStorage.getItem('shoppingAt');
  image:any;
  constructor(private productService: ProductsService, private router: Router, private activatedRoute:ActivatedRoute) { }
  public product = new ProductModel("","",this.shopName,"","","","","","");
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.productService.getData(this.id).subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
      this.products[0].image="";
      console.log(this.products[0].image)
    });
  }

  selectImage(event:any){
    this.image=<File>event.target.files[0];
    console.log(this.image.name);
  }

  updateProduct(){
    // const formData =new FormData();
    
    // //formData.append('productImage', this.image, this.image.name);
    // formData.append("productName",this.products[0].productName);
    // formData.append("shopName",this.products[0].shopName);
    // formData.append("category",this.products[0].category);
    // formData.append("price",this.products[0].price);
    // formData.append("quantity",this.products[0].quantity);
    // formData.append("stock",this.products[0].stock);
    // formData.append("unit",this.products[0].unit);
    // formData.append("id",this.products[0]._id);
    // //console.log(formData)
    console.log(this.products[0]);
    this.productService.updateProduct(this.products[0]);
    this.router.navigate(['products']);
  }

}