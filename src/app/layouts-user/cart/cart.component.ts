import { MessageService } from './../../Services/message.service';
import { CartService } from './../../Services/cart.service';
import { Cart } from './../../models/cart';
import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private message: MessageService
  ) { }
  product: Product[];
  cartID;
  cart: [];
  CartItem =[];
  totalMoneyCart = 0;
  totalMoneyItem;
  qty;
  ngOnInit(): void {
    this.cart = JSON.parse(window.localStorage.getItem("Cart"));
    this.productService.getProducts().subscribe((data: Product[]) =>{
      data.forEach(p =>{
        this.cart.forEach((c: Cart) =>{
          if(c.id == p._id){
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
  }
  removeItem(id: string){
    this.cartService.removeItem(id);
    let cartItem = JSON.parse(window.localStorage.getItem("Cart"));
    this.cartID = window.localStorage.getItem('cartId');
    this.cartService.updateCartApi(cartItem,this.cartID).subscribe(res =>{
      // console.log(res)
    });
    location.reload();
    this.message.changeMessage(cartItem.lenght)
  }
  upDate(_id, price){
    this.qty = (<HTMLInputElement>document.getElementById(_id)).value;
    var total =  this.qty * price;
   (<HTMLInputElement>document.getElementById('total.'+_id)).innerHTML = total.toString()+' đ';
    // console.log(this.qty)
    // console.log(_id)
    this.cartService.updateCartLocal(_id,Number.parseInt(this.qty)); 
    this.cart = JSON.parse(window.localStorage.getItem("Cart"));
    this.totalMoneyCart = 0;
    this.cart.forEach((c :Cart) =>{
      //console.log(this.totalMoneyCart)
      var totalC = (<HTMLInputElement>document.getElementById('total.'+c.id)).innerHTML;
      totalC = totalC.slice(0,-2)
      this.totalMoneyCart += Number.parseInt(totalC);
    });
    (<HTMLInputElement>document.getElementById('totalMoneyCart')).innerHTML = this.totalMoneyCart.toString()+' đ';
    //location.reload();
    let cartItem = JSON.parse(window.localStorage.getItem("Cart"));
    this.cartID = window.localStorage.getItem('cartId');
    this.cartService.updateCartApi(cartItem,this.cartID).subscribe(res =>{
      console.log(res)
    });
  }
}
