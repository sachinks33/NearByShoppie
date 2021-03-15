import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './auth.guard';
import { BillComponent } from './bill/bill.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { LoginComponent } from './login/login.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { ProductsComponent } from './products/products.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path:'addproduct',canActivate:[AuthGuard], component:AddProductComponent},
  {path:'login', component:LoginComponent},
  {path:'c-registeration', component:CustomerRegistrationComponent},
  {path:'m-registeration', component:MerchantRegisterComponent},
  {path:'products', component:ProductsComponent},
  {path:'', component:LoginComponent},
  {path:'shops', component:ShopsListComponent},
  {path:'bill', component:BillComponent},
  {path:'products/:id', component:UpdateProductComponent}];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
