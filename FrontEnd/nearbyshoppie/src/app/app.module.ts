import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TockenInterceptorService} from './tocken-interceptor.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { UsersService} from './users.service';
import { ProductsService} from './products.service';
import { BillComponent } from './bill/bill.component';
import { UpdateProductComponent } from './update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    ProductsComponent,
    LoginComponent,
    CustomerRegistrationComponent,
    MerchantRegisterComponent,
    AddProductComponent,
    ShopsListComponent,
    BillComponent,
    UpdateProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersService,ProductsService, {provide:HTTP_INTERCEPTORS,useClass:TockenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
