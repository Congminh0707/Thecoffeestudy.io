import { Injectable } from '@angular/core';
import { Product } from 'app/models/Product';
import { WebRequestService } from './web-request.service';
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //private products: Product[] = [];
  private products$ = new Subject<Product[]>();
  readonly url = "http://localhost:1337/api/product";
  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient) { }

  getCate() {
    return this.webReqService.get('Categories');
  }

  getProductsById(productId: string) {
    return this.webReqService.get(`products?_id=${productId}`);
  }

  getProducts() {
    return this.webReqService.get(`products`);
  }
  // getDetailProduct(categoryId: string, productId: String) {
  //   return this.webReqService.get(`api/product/${categoryId}/${productId}`);
  // }
  getCoupon(){
    return this.webReqService.get(`coupon-coffees`)
  }

}
