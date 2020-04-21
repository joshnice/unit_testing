import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { InputMoneyComponent } from './input-money/input-money.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { DiscountService } from './product/discount.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
  HttpClientModule],
  
  declarations: [
    AppComponent,
    UserComponent,
    CheckoutComponent,
    ProductComponent,
    InputMoneyComponent
  ],

  providers: [UserService, DiscountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
