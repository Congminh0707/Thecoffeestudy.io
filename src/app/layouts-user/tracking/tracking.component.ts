import { Coupon } from './../../models/coupon';
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
  couponUse: Coupon;
  moneyDiscountRate = 0;
  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data => {
      this.oderId = data.oderId;
      console.log(this.oderId)
    });
    this.cartService.getOder(this.oderId).subscribe((data: Oder) => {
      this.CartItem = data.items;
      this.oder = data;
      console.log(this.oder)
      this.couponUse = data.coupon;
      this.totalMoneyCart = Number.parseInt(data.totalmoney);
      // console.log(this.couponUse);
      this.applyCoupon();
      // console.log(new Intl.NumberFormat().format(this.totalMoneyCart));
    })
  }
  applyCoupon() {
    // console.log(total)
    if (this.couponUse?.applicable_type == 'Minimum_order_value') {
      this.minimumOderValue();
    }
    if (this.couponUse?.applicable_type == 'Minimum_number_of_drinks') {
      this.minimumNumberOfDrink();
    }
  }
  ///-------------------------------------------///
  minimumNumberOfDrink() {
    if (this.couponUse.applicabletype == 'money_reduction') {
      this.moneyReduction();
    }
    if (this.couponUse.applicabletype == 'percentage_reduction') {
      this.percentageReduction();
    }
  }
  ///----------------------------------------------///
  minimumOderValue() {
    if (this.couponUse.applicabletype == 'money_reduction') {
      this.moneyReduction();
    }
    if (this.couponUse.applicabletype == 'percentage_reduction') {
      this.percentageReduction();
    }
  }
  ////------------------------------------///
  moneyReduction() {
    this.moneyDiscountRate = Number.parseInt(this.couponUse.discount_rate);
  }
  ///------------------------------------///
  percentageReduction() {
    this.moneyDiscountRate = this.totalMoneyCart * Number.parseInt(this.couponUse.discount_rate) / 100;
  }
}
