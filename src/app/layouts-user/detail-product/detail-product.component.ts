import { MessageService } from './../../Services/message.service';
import { CartService } from './../../Services/cart.service';
import { data } from 'jquery';
import { Product } from './../../models/product';
import { ProductService } from './../../Services/product.service';
import { ActivatedRoute, Router ,NavigationEnd} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  constructor(
    private routerA: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private data: MessageService
  ) { }
  categoryId;
  productId;
  cartId;
  productDetail: Product[];
  product: Product[];
  productRandom: Product[];
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.routerA.params.subscribe(sucess => {
      console.log(sucess)
      this.productId = sucess.productId;
      this.getProductsById(this.productId);
      this.getProducts();

    });
  }
  getProductsById(productId: string) {
    this.productService.getProductsById(productId).subscribe((data: Product[]) => {
      this.productDetail = data;
      console.log(this.productDetail);
    });
  }
  getProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.product = data;
      console.log(this.product.length);

      this.randomProducts(this.product);
    })
  }
  randomProducts(product?: Product[]) {
    var result = [];
    for (let i = 1; i <= 4; i++) {
      var idx = Math.floor(Math.random() * product.length);
      result.push(product[idx]);
      product.splice(idx, 1);
    }
    this.productRandom = result;
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
