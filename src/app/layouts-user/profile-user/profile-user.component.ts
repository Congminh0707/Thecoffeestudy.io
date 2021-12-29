import { HttpResponse } from '@angular/common/http';
import { User } from './../../models/user.model';
import { AuthenService } from './../../Services/authen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {
  userInf: User;
  fullname;
  phone;
  address;
  email;
  userId = window.localStorage.getItem('userId');
  constructor(
    private authenService: AuthenService
  ) { }

  ngOnInit(): void {
    this.authenService.getInF(this.userId).subscribe((res: User) => {
      this.userInf = res;
      this.fullname = this.userInf.fullname;
      this.phone = this.userInf.phone;
      this.address = this.userInf.address;
      this.email = this.userInf.email;
    })
  }
  saveInf(fullname, adress) {
    this.authenService.updateUserInf(this.userId, fullname, adress).subscribe((res: User) => {
      console.log(res);

      window.location.reload();
    })
  }
}
