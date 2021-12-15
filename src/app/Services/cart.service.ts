import { Cart } from './../models/cart';
import { WebRequestService } from './web-request.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private WebRequestService: WebRequestService
  ) { }
  addToCart(id: string, qty?: string) {
    let i = 0;
    if (!window.localStorage.getItem("Cart")) {
      const Cart = [
        {
          id: id,
          qty: 1
        },
      ]
      window.localStorage.setItem("Cart", JSON.stringify(Cart));
    } else {
      let cart = JSON.parse(window.localStorage.getItem("Cart"));
      cart.forEach(element => {
        if (element.id == id) {
          element.qty++;
          i++;
          window.localStorage.setItem("Cart", JSON.stringify(cart));
        }
      });
      if (i == 0) {
        cart.push({ id: id, qty: 1 });
        window.localStorage.setItem("Cart", JSON.stringify(cart));
      }
    }
  }
  updateCartLocal(id: string, qty: number) {
    let i = 0;
    let cart = JSON.parse(window.localStorage.getItem("Cart"));
    cart.forEach(element => {
      if (element.id == id) {
        element.qty = qty;
        i++;
        window.localStorage.setItem("Cart", JSON.stringify(cart));
      }
    });
  }
  removeItem(id: string) {
    let i = 0;
    let cart = JSON.parse(window.localStorage.getItem("Cart"));
    cart.forEach(element => {
      if (element.id == id) {
        cart.splice(i, 1);
      }
      i++;
    });
    window.localStorage.setItem("Cart", JSON.stringify(cart));
  }
  createCart() {
    let items = [];
    return this.WebRequestService.post(`carts`, {
      items
    })
  }
  updateCartApi(item: [], cartId) {
    return this.WebRequestService.put(`carts/${cartId}`, {
      'items': item
    })
  }
  checkOut(oderstatus: boolean, methodOfPayment: string, totalMoney: string, item: Cart[], userId: string, address: string, note: string, phone: string, fullname: string) {
    return this.WebRequestService.post(`oders`, {
      'oderstatus': oderstatus,
      'methodofpayments': methodOfPayment,
      'totalmoney': totalMoney,
      'items': item,
      'userid': userId,
      'address': address,
      'note': note,
      'phone': phone,
      'fullname': fullname
    })
  }
  getOder(oderId){
    return this.WebRequestService.get(`oders/${oderId}`);
  }
}
