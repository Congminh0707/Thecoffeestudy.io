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
    
    if(!this.cart){
    } 
    else
      this.qty = this.cart.length;
    console.log(this.cart)
    this.roles = window.localStorage.getItem('roles');
  }
}
