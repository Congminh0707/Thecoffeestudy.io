import { Oder } from './../../models/oder';
import { User } from 'app/models/user.model';
import { HttpResponse } from '@angular/common/http';
import { AuthenService } from 'app/Services/authen.service';
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
  userInf: User;
  fullname;
  phone;
  address;
  confirmAddress;
  oderId;
  dateTimeNow: string;
  totalFinal = 0;
  userId = window.localStorage.getItem('userId');
  cartId = window.localStorage.getItem('cartId');
  moneyDiscountRate = 0;
  constructor(
    private productService: ProductService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private modalService: ModalService,
    private authenService: AuthenService
  ) { }

  get formControlsInfo() { return this.formInfo.controls; }
  get formControlsPay() { return this.formPay.controls; }
  ngOnInit(): void {
    this.activeRouter.params?.subscribe(sucess => {
      if (sucess.productId) {
        this.productId = sucess.productId;
        this.getProduct(this.productId);
      }
    });
    ///============================///
    ///=========================///
    this.authenService.getInF(this.userId).subscribe((res: User) => {
      this.userInf = res;
      this.fullname = this.userInf.fullname;
      this.phone = this.userInf.phone;
      this.address = this.userInf.address;
    })
    ///=========================///
    this.productService.getCoupon().subscribe((data: Coupon[]) => {
      // console.log(data)
      //this.coupon = data;
      data.forEach((c: Coupon, index) => {
        // console.log(c)
        // console.log(index)
        c.expiration_date = this.convertDate(c.expiration_date);
      })
      this.coupon = data.filter((c: Coupon) => {
        return !this.checkDate(c.expiration_date)
      });
      // console.log(this.coupon)
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
      // console.log(this.CartItem)

      this.totalMonayCart_transportFee();
    })
    ///======================================///
    ///=========================///
  }
  ///------------------------------------///
  checkOut(fullname, phone, adress, note, pay) {
    console.log(this.formInfo.value);
    console.log(this.formPay.value);
    console.log(this.userId)
    this.cartService.checkOut(true,pay,this.totalFinal.toString(),this.cart,this.userId,adress,note,phone,fullname).subscribe((res: Oder) =>{
    this.router.navigate([`/tracking/${res.id}`])
    });
    let cart = [];
    window.localStorage.setItem('Cart', cart.toString());
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
    this.cartService.updateCartApi(cartItem, this.cartID).subscribe(res => {
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
  useCouponByCode(code: string){
    code = code.toLowerCase();
    var couponUse = this.coupon.filter((c:Coupon) =>{
      c.code = c.code.toLowerCase();
      return c.code === code;
    });
    this.couponUse = couponUse[0];
    this.closeModal('modal-rewards')
    this.applyCoupon();
  }
  ///------------------------------------///
  applyCoupon() {
    let total;
    total = (<HTMLInputElement>document.getElementById('totalMoneyCart')).innerHTML;
    total = total.slice(0, -2)
    // console.log(total)
    if (this.transportFee > 0) {
      this.totalFinal = Number.parseInt(total) + this.transportFee;
    }
    else {
      this.totalFinal = Number.parseInt(total)
    }
    (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalFinal.toString() + ' đ';
    if (this.couponUse.applicable_type == 'Minimum_order_value') {
      this.minimumOderValue();
      console.log(this.totalFinal);
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalFinal.toString() + ' đ';
    }
    if (this.couponUse.applicable_type == 'Minimum_number_of_drinks') {
      this.minimumNumberOfDrink();
      console.log(this.totalFinal);
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalFinal.toString() + ' đ';
    }
  }
  ///-------------------------------------------///
  minimumNumberOfDrink() {
    this.isMinimum_order_value = true;
    var qty = this.checkQtyCart();
    if (Number.parseInt(this.couponUse.minimum_condition) > qty) {
      this.moneyDiscountRate = 0;
      this.isMinimum_number_of_drinks = false;
      this.isCoupon = false;
      return;
    }
    else {
      if (this.couponUse.applicabletype == 'money_reduction') {
        this.moneyReduction();
      }
      if (this.couponUse.applicabletype == 'percentage_reduction') {
        this.percentageReduction();
      }
    }
  }
  ///----------------------------------------------///
  minimumOderValue() {
    this.isMinimum_number_of_drinks = true;
    if (Number.parseInt(this.couponUse.minimum_condition) > this.totalFinal) {
      this.moneyDiscountRate = 0;
      this.isMinimum_order_value = false;
      this.isCoupon = false;
      return;
    }
    else {
      if (this.couponUse.applicabletype == 'money_reduction') {
        this.moneyReduction();
      }
      if (this.couponUse.applicabletype == 'percentage_reduction') {
        this.percentageReduction();
      }
    }
  }
  ////------------------------------------///
  moneyReduction() {
    this.totalFinal -= Number.parseInt(this.couponUse.discount_rate);
    this.moneyDiscountRate = Number.parseInt(this.couponUse.discount_rate);
    this.isCoupon = true;
    this.isMinimum_order_value = true;
  }
  ///------------------------------------///
  percentageReduction() {
    this.moneyDiscountRate = this.totalFinal * Number.parseInt(this.couponUse.discount_rate) / 100;
    this.totalFinal -= this.moneyDiscountRate;
    this.isCoupon = true;
    this.isMinimum_order_value = true;
  }
  ///------------------------------------///
  openModal(id: string) {
    this.modalService.open(id);
  }
  ///------------------------------------///
  checkQtyCart() {
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
  ///-------------------------------------///
  checkDate(date: string) {
    var currentdate = new Date();
    var dateTimeNow = this.convertDate(currentdate)
    return dateTimeNow >= date;
  }
  ///-------------------------------------///
  totalMonayCart_transportFee() {
    var qtyCart = this.checkQtyCart();
    if (qtyCart > 1) {
      this.transportFee = 0;
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalMoneyCart.toString() + ' đ';
    }
    else {
      this.transportFee = 10000;
      this.totalMoneyCart += this.transportFee;
      // console.log(this.totalMoneyCart);
      (<HTMLInputElement>document.getElementById('totalFinal-p')).innerHTML = this.totalMoneyCart.toString() + ' đ';
    }
  }
  saveInf(fullname, phone, adress) {
    this.authenService.updateUser(this.cartId, this.userId, null, fullname, adress, phone).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }
  pad(n) { return ("0" + n).slice(-2); }
  inf(address){
    let date = new Date();
    let hours = date.getHours();
    let minute = date.getMinutes();
    minute +=30;
    if(minute>=60){
      hours+=1;
      minute-=60;
    }
    // console.log(hours+" : " +minute);
    // console.log(address)
    this.confirmAddress = "Đơn hàng Giao tận nơi sẽ được giao vào "+this.pad(hours)+"h"+this.pad(minute)+" hôm nay tại "+ address;
  }
}
