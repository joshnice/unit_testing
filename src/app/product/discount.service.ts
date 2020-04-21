import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DiscountService {

  constructor(private http: HttpClient) { }

  async getDiscount() {
    return await this.http.get<any>('http://www.mocky.io/v2/5e9eecc02d00007700cb787e').toPromise();
  }



}
