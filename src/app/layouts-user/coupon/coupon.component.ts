import { Coupon } from './../../models/coupon';
import { data } from 'jquery';
import * as moment from 'moment';
import { Category } from 'app/models/Category.model';
import { ProductService } from 'app/Services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  dateFormart: 'DD/MM/YYYY';
  date_formart = 'DD/MM/YYYY HH:mm:ss';
  datetimeformart: 'DD/MM/YYYY HH:mm:ss';
  constructor(
    private productService: ProductService,
  ) { }
  coupon : Coupon[];
  ngOnInit(): void {
    this.productService.getCoupon().subscribe((data: Coupon[])=> {
      // console.log(data)
      //this.coupon = data;
      data.forEach((c: Coupon) =>{
        c.expiration_date = this.convertDate(c.expiration_date);
      })
      this.coupon = data;
    });
   
  }

  convertDate(expiration_date){
    var s = this.dateStringToTimestamp(expiration_date);
    var y = this.timestampTodate(s);
    return y;
  }
  timestampTodate(date: number): string {
    return moment(date).format(this.date_formart);

  }
  dateStringToTimestamp(date: string): number {
    return Number.parseInt(moment(date, this.datetimeformart).format('x'));
  }
}
