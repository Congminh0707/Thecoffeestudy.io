import { data } from 'jquery';
import { Coupon } from './../../models/coupon';
import { ModalService } from './modal/modal.service';
import { CartService } from './../../Services/cart.service';
import { Cart } from './../../models/cart';
import { Product } from './../../models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/Services/product.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  cartID;
  productId;
  formInfo: FormGroup;
  formPay: FormGroup;
  product: Product[];
  cart: Cart[];
  CartItem = [];
  totalMoneyCart = 0;
  totalMoneyItem;
  transportFee = 0;
  qty;
  bodyText: string;
  dateFormart: 'DD/MM/YYYY';
  date_formart = 'DD/MM/YYYY HH:mm:ss';
  datetimeformart: 'DD/MM/YYYY HH:mm:ss';
  isMinimum_order_value = true;
  isMinimum_number_of_drinks = true;
  coupon: Coupon[];
  couponUse: Coupon;
  isCoupon = true;
  moneyDiscountRate = 0;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private modalService: ModalService,
  ) { }

  get formControlsInfo() { return this.formInfo.controls; }
  get formControlsPay() { return this.formPay.controls; }
  ngOnInit(): void {
    this.router.params?.subscribe(sucess => {
      if (sucess.productId) {
        this.productId = sucess.productId;
        this.getProduct(this.productId);
      }
    });
    ///=========================///
    ///=========================///
    this.productService.getCoupon().subscribe((data: Coupon[]) => {
      console.log(data)
      //this.coupon = data;
      data.forEach((c: Coupon) => {
        c.expiration_date = this.convertDate(c.expiration_date);
      })
      this.coupon = data;
    });
    ///=========================///
    this.formInfo = this.formBuilder.group({
      username: ['', [Validators.required,]],
      phoneNumber: ['', [Validators.required,]],
      adress: ['', [Validators.required, Validators.minLength(8),]],
      note: ['', Validators.required],
    });
    ///=========================///
    this.formPay = this.formBuilder.group({
      Pay: ['cash', [Validators.required]]
    });
    ///=========================///
    this.cart = JSON.parse(window.localStorage.getItem("Cart"));
    ///=========================///
    ///=========================///
    this.productService.getProducts().subscribe((data: Product[]) => {
      data.forEach(p => {
        this.cart.forEach((c: Cart) => {
          if (c.id == p._id) {
            c._id = p._id
            c.price = Number.parseInt(p.price);
            c.name = p.name;
            c.description = p.description;
            c.image = p.image;
            c.totalMoney = c.qty * Number.parseInt(p.price);
            this.CartItem.push(c);
            this.totalMoneyCart += c.qty * Number.parseInt(p.price);
          }
        })
      })
      console.log(this.CartItem)
    })
    ///=========================///
  }
  ///------------------------------------///
  checkOut() {
    console.log(this.formInfo.value);
    console.log(this.formPay.value);
  }
  ///------------------------------------///
  getProduct(productId: string) {
    this.productService.getProductsById(productId).subscribe((data: Product[]) => {
      this.product = data;
      console.log(this.product);
    });
  }
  ///------------------------------------///
  removeItem(id: string) {
    this.cartService.removeItem(id);
    location.reload();
  }
  ///------------------------------------///
  upDate(_id, price) {
    this.qty = (<HTMLInputElement>document.getElementById(_id)).value;
    var total = this.qty * price;
    (<HTMLInputElement>document.getElementById('total.' + _id)).innerHTML = total.toString() + ' đ';
    console.log(this.qty)
    console.log(_id)
    this.cartService.updateCartLocal(_id, this.qty);
    this.cart = JSON.parse(window.localStorage.getItem("Cart"));
    this.totalMoneyCart = 0;
    this.cart.forEach((c: Cart) => {
      //console.log(this.totalMoneyCart)
      var totalC = (<HTMLInputElement>document.getElementById('total.' + c.id)).innerHTML;
      totalC = totalC.slice(0, -2)
      this.totalMoneyCart += Number.parseInt(totalC);
    });
    (<HTMLInputElement>document.getElementById('totalMoneyCart')).innerHTML = this.totalMoneyCart.toString() + ' đ';
    //location.reload();
    this.totalMonayCart_transportFee();
    if (this.couponUse) {
      this.applyCoupon();
    }
    let cartItem = JSON.parse(window.localStorage.getItem("Cart"));
    this.cartID = window.localStorage.getItem('cartId');
    this.cartService.updateCartApi(cartItem,this.cartID).subscribe(res =>{
      console.log(res)
    });
  }
  ///------------------------------------///
  useCoupon(idCoupon: string) {
    console.log(idCoupon);
    this.coupon.forEach((data: Coupon) => {
      if (data.id === idCoupon) {
        this.couponUse = data;
      }
    })
    console.log(this.couponUse)
    this.closeModal('modal-rewards')
    this.applyCoupon();
  }
  ///------------------------------------///
  applyCoupon() {
    let total;
    total = (<HTMLInputElement>document.getElementById('totalMoneyCart')).innerHTML;
    total = total.slice(0, -2)
    let totalFinal = 0;
    // console.log(total)
    if (this.transportFee > 0) {
      totalFinal = Number.parseInt(total) + this.transportFee;
    }
    else {
      totalFinal = Number.parseInt(total)
    }
    (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = totalFinal.toString() + ' đ';
    if (this.couponUse.applicable_type == 'Minimum_order_value') {
      this.isMinimum_number_of_drinks = true;
      if (Number.parseInt(this.couponUse.minimum_condition) > totalFinal) {
        this.moneyDiscountRate = 0;
        this.isMinimum_order_value = false;
        this.isCoupon = false;
        return;
      }
      else {
        if (this.couponUse.applicabletype == 'money_reduction') {
          totalFinal -= Number.parseInt(this.couponUse.discount_rate);
          this.moneyDiscountRate = Number.parseInt(this.couponUse.discount_rate);
          this.isCoupon = true;
          this.isMinimum_order_value = true;
        }
        if (this.couponUse.applicabletype == 'percentage_reduction') {
          this.moneyDiscountRate = totalFinal * Number.parseInt(this.couponUse.discount_rate) / 100;
          totalFinal -= this.moneyDiscountRate;
          this.isCoupon = true;
          this.isMinimum_order_value = true;
        }
        console.log(totalFinal);
        (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = totalFinal.toString() + ' đ';
      }
    }
    if (this.couponUse.applicable_type == 'Minimum_number_of_drinks') {
      this.isMinimum_order_value = true;
      var qty = this.checkQtyCart();
      if(Number.parseInt(this.couponUse.minimum_condition) > qty){
        this.moneyDiscountRate = 0;
        this.isMinimum_number_of_drinks = false;
        this.isCoupon = false;
        return;
      }
      else{
        if (this.couponUse.applicabletype == 'money_reduction') {
          totalFinal -= Number.parseInt(this.couponUse.discount_rate);
          this.moneyDiscountRate = Number.parseInt(this.couponUse.discount_rate);
          this.isCoupon = true;
          this.isMinimum_number_of_drinks = true;
        }
        if (this.couponUse.applicabletype == 'percentage_reduction') {
          this.moneyDiscountRate = totalFinal * Number.parseInt(this.couponUse.discount_rate) / 100;
          totalFinal -= this.moneyDiscountRate;
          this.isCoupon = true;
          this.isMinimum_number_of_drinks = true;
        }
      }
      console.log(totalFinal);
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = totalFinal.toString() + ' đ';
    }
  }
  ///------------------------------------///
  openModal(id: string) {
    this.modalService.open(id);
  }
  ///------------------------------------///
  checkQtyCart(){
    let cart = JSON.parse(window.localStorage.getItem("Cart"));
    var qty = 0;
    cart.forEach(data => {
      qty += Number.parseInt(data.qty)
    });
    return qty;
  }
  ///------------------------------------///
  closeModal(id: string) {
    this.modalService.close(id);
  }
  convertDate(expiration_date) {
    var s = this.dateStringToTimestamp(expiration_date);
    var y = this.timestampTodate(s);
    return y;
  }
  ///------------------------------------///
  timestampTodate(date: number): string {
    return moment(date).format(this.date_formart);

  }
  ///------------------------------------///
  dateStringToTimestamp(date: string): number {
    return Number.parseInt(moment(date, this.datetimeformart).format('x'));
  }
  totalMonayCart_transportFee(){
    var qtyCart = this.checkQtyCart();
    if(qtyCart > 1){
      this.transportFee = 0;
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalMoneyCart.toString() + ' đ';
    }
    else{
      this.transportFee = 10000;
      this.totalMoneyCart += this.transportFee;
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalMoneyCart.toString() + ' đ';
    }
  }
}
