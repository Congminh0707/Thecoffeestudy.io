import { Oder } from './../../models/oder';
import { data } from 'jquery';
import { CartService } from './../../Services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from './../../models/cart';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private cartService: CartService
  ) { }
  CartItem: Cart[];
  totalMoneyCart = 0;
  oder: Oder;
  oderId;
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data =>{
      this.oderId = data.oderId;
      console.log(this.oderId)
    });
    this.cartService.getOder(this.oderId).subscribe((data: Oder) =>{
      this.CartItem = data.items;
      this.oder = data;
      this.totalMoneyCart = Number.parseInt(data.totalmoney);
    })
  }
}
