
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roles;
  cart;
  qty;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cart = JSON.parse(window.localStorage.getItem('Cart'))
   
    const url = window.location.href;
    this.cssChange(url.split('/')[3].toLowerCase())
    if (!this.cart) {
    }
    else
      this.qty = this.cart.length;
    console.log(this.cart)
    this.roles = window.localStorage.getItem('roles');
    
  }
  idMenu = ['home', 'menu', 'study', 'coupon', 'blog', 'store'];
  cssChange(id: string) {
    console.log(id)
    document.getElementById(id).style.backgroundColor = 'rgb(182, 55, 17)';
    document.getElementById(id).style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset";
    document.getElementById(id).style.color = "white";
    document.getElementById(id).style.border = "2px solid #580101"
    this.idMenu.forEach(idc => {
      if (idc != id) {
        this.cssDefault(idc);
      }
    }); 
  }
  
  cssDefault(id: string) {
    document.getElementById(id).style.backgroundColor = '#9d2621';
    document.getElementById(id).style.boxShadow = 'none';
    document.getElementById(id).style.color = 'rgba(255, 255, 255, 0.384';
    document.getElementById(id).style.border = "none"
  }
}
