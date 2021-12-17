import { MessageService } from './../../Services/message.service';
import { Router,NavigationEnd } from '@angular/router';
import { CartService } from './../../Services/cart.service';
import { Category } from 'app/models/Category.model';
import { ProductService } from 'app/Services/product.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'app/models/product';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {

  categoryId;
  cartId;
  category;
  product: Product[];
  message: string;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private data: MessageService
  ) { }
  // @Output() messageEvent = new EventEmitter<string>();
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.productService.getCate().subscribe((category: any[]) => {
      this.category = category;
      category.forEach(data =>{
        // console.log(data);
      });
    });
  }
  addToCart(id: string){
    this.cartService.addToCart(id);
    let cartItem = JSON.parse(window.localStorage.getItem("Cart"));
    this.cartId = window.localStorage.getItem('cartId');
    this.cartService.updateCartApi(cartItem,this.cartId).subscribe(res =>{
      // console.log(res)
    });
    this.data.changeMessage(cartItem.length);
    // this.messageEvent.emit(cartItem.length);
  }
  // converProduct(data): Product[]{
  //   const result = []; 
  //   data.forEach(element => {
  //     // tslint:disable-next-line:semicolon
  //     const i  = new Product();
  //     i.name = element.name;
  //     i._id = element._id;
  //     i._categoryId = element._categoryId;
  //     i.imagePath = element.imagePath;
  //     i.description = element.description;
  //     i.price = element.price;
  //     result.push(i);
  //   });
  //   return result;
  // }
}
