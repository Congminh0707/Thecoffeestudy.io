import { HttpClient } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient
  ) { }

  getOrders(){
    return this.webReqService.get(`oders`)
  }
}
