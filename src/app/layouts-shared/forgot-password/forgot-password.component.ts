import { HttpResponse } from '@angular/common/http';
import { AuthenService } from 'app/Services/authen.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authenService: AuthenService,
  ) { }

  ngOnInit(): void {
  }
  onLoginButtonClicked(email: string) {
    this.authenService.forgotPassword(email).subscribe((res: HttpResponse<any>) => {
      console.log(res)
    });
  };
}
