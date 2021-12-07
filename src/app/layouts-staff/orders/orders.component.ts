import { data } from 'jquery';
import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data =>{
      console.log(data);
    })
  }

}
