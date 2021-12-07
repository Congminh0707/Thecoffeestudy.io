import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'app/Services/authen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username;
  roles;
  fullname;

  constructor(
    private authenService: AuthenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = window.localStorage.getItem('user-name');
    this.fullname = window.localStorage.getItem('full-name')
    console.log(this.fullname, this.username)
  }
  logout() {
    this.authenService.logout();
    this.router.navigate(['/login']);
  }

  homeUser() {
    this.username = window.localStorage.getItem('user-name');
    this.fullname = window.localStorage.getItem('full-name')
    this.router.navigate(['/profile']);
  }
}
