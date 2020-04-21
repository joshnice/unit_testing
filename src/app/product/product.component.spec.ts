import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { DiscountService } from './discount.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCheckboxModule, MatButtonModule, HttpClientModule],
      declarations: [ProductComponent],
      providers: [DiscountService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // component creation
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  /*Single items*/

  it('should change the checked value of the product', () => {
    const return_item = component.updateProduct(true);
    expect(return_item).toEqual(false);
  });

  it('should increase the value of total price when a new item is added to basket', () => {
    const intial_price_total = component.price_total;
    component.updatePrice(100, true); 
    expect(component.price_total).toBeGreaterThan(intial_price_total);
  });

  it('should decrease the value of total price when a new item is removed from the basket', () => {
    const intial_price_total = 100
    component.updatePrice(50, false);
    expect(component.price_total).toBeLessThan(intial_price_total);
  });

  it('should add the item to the basket array if item is not aleady present', () => {
    component.updateBasket('tv', true);
    fixture.detectChanges();
    const basket = fixture.debugElement.query(By.css('#basket'));
    expect(basket.nativeElement.textContent).toEqual('tv');
  });

  it('should remove the item to the basket array if item is aleady present', () => {
    component.basket = ['tv']
    component.updateBasket('tv', false);
    fixture.detectChanges();
    const basket = fixture.debugElement.query(By.css('#basket-empty'));
    expect(basket.nativeElement.textContent).toEqual('No items in basket');
  });

  /*Mutiple items*/

  it('should increase the value of total price when a second item is added to basket', () => {
    component.price_total = 10;
    const intial_price_total = component.price_total;
    component.updatePrice(100, true); 
    expect(component.price_total).toBeGreaterThan(intial_price_total);
  });

  it('should concatenate the item to the basket once added', () => {
    component.basket = ['apple']
    component.updateBasket('tv', true);
    fixture.detectChanges();
    const basket = fixture.debugElement.query(By.css('#basket-container'));
    expect(basket.nativeElement.textContent).toEqual('appletv');
  });

  /*Service and component testing*/ 
  
  it ('should call the function from the service', async () => {
    const discount_spy = setupService();
    await discount_spy();
    expect(discount_spy).toHaveBeenCalled();
  });

  it ('should get the discount value from the api', async () => {
    const discount_spy = setupService();
    const value = await discount_spy();
    expect(value).toEqual({value: 0.2});
  });

  it('once discount is applied the price should be smaller but 20%', async () => {

    const discount_spy = setupService();

    const discount_value = await discount_spy();
    component.price_total = 100;
    component.discount_price = 0;
    component.discount = discount_value;
   
    component.applyDiscount();

    expect(component.discount_price).toEqual(80);
  });

  it('once the discount button is pressed the price should be 20% smaller', async () => {

    const discount_spy = setupService();
    const value = await discount_spy();

    component.price_total = 100;
    component.discount = value;

    component.applyDiscount();
    fixture.detectChanges();

    const discount_price = fixture.debugElement.query(By.css('#new-price'));
    expect(discount_price.nativeElement.textContent).toEqual('New Price: 80');
  });


  // function to set up discount service
  function setupService() {
    const debugElement = fixture.debugElement;
    const discount_service = debugElement.injector.get(DiscountService);
    return spyOn(discount_service, 'getDiscount')
      .and.returnValue(Promise.resolve({value: 0.2}));
  }

});
