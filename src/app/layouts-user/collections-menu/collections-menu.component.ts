import { MessageService } from './../../Services/message.service';
import { CartService } from './../../Services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { Product } from 'app/models/Product';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/models/Category.model';
import { ProductService } from 'app/Services/product.service';

@Component({
  selector: 'app-collections-menu',
  templateUrl: './collections-menu.component.html',
  styleUrls: ['./collections-menu.component.css']
})
export class CollectionsMenuComponent implements OnInit {

  category: Category[];
  product: Product[];
  selectedView: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private data: MessageService,
  ) { }
  categoryId;
  cartId;
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.productService.getCate().subscribe((category: any[]) => {
      this.category = category;
      // console.log(category);
      this.clickProduct(category[0]._id);
      this.categoryId = category[0]._id;
    });
    window.onload = function () {
      document.getElementById('cate.' + 0).style.backgroundColor = "#ffe7ba";
      document.getElementById('cate-name.' + 0).style.color = "#fa8c16";
    };
  }
  clickProduct(id?, index?) {
    this.category.forEach(cate => {
      if (cate._id == id) {
        this.product = cate.products
      }
    })
    if (index == undefined) {
      return;
    }
    if (index == 0) {
      this.cssNewByIdCate(index);
      for (let i = 5; i > 0; i--) {
        this.cssDefaultByIdCate(i)
      }
    } else {
      this.cssNewByIdCate(index);
      for (let i = 0; i < Number.parseInt(index); i++) {
        this.cssDefaultByIdCate(i);
      }
      for (let i = Number.parseInt(index) + 1; i <= 5; i++) {
        this.cssDefaultByIdCate(i);
      }
    }
  }
  cssDefaultByIdCate(i) {
    document.getElementById('cate.' + i).style.background = "#fff7e6";
    document.getElementById('cate-name.' + i).style.color = "#b2b2b2";
  }
  cssNewByIdCate(index) {
    document.getElementById('cate.' + index).style.backgroundColor = "#ffe7ba";
    document.getElementById('cate-name.' + index).style.color = "#fa8c16";
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
}
