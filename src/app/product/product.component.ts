import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Product } from './product.interface'
import { DiscountService } from './discount.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {

  constructor(
    private discount_service: DiscountService
  ) { }

  public price_total: number = 0;
  public discount_price: number = 0;

  public basket: string [] = [];
  public discount: any;


  public products: Product[] = [{
    name: 'apples',
    price: 10,
    checked: false
  },{
    name: 'beer',
    price: 20,
    checked: false
  }, {
    name: 'tv',
    price: 100,
    checked: false
  },
  {
    name: 'sugar',
    price: 5,
    checked: false
  }
]

  ngOnInit() {
  }

  productChange(event: any, product: Product) {
    product.checked = this.updateProduct(product.checked);
    this.updatePrice(product.price, product.checked);
    this.updateBasket(product.name, product.checked);
  }

  updatePrice(price: number, checked: boolean) {
    if (checked) {
      this.price_total += price; 
    } else {
      this.price_total -= price;
    }

    this.discount && this.applyDiscount();
  }

  updateProduct(product_checked: boolean) {
    return !product_checked;
  }

  updateBasket(product_name: string, checked: boolean) {
    if (checked) {
      this.basket.push(product_name);
    } else {
      this.basket = this.basket.filter(item => item !== product_name);
    }
  }

  checkBasketLength() {
    return this.basket.length === 0 ? true : false;
  }

  async getDiscount() {
    this.discount = await this.discount_service.getDiscount();
    this.applyDiscount();
  }

  applyDiscount() { 
    this.discount_price = this.price_total - (this.price_total * this.discount.value);
  }

}
