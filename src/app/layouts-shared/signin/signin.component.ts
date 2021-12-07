import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'app/Services/authen.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  roles;
  isSubmitted = false;
  loginForm: FormGroup;
  isLoading = false;
  isLogin = true;
  isConfirmed = true;
  get formControls() { return this.loginForm.controls; }
  ngOnInit(): void {
    if (window.localStorage.getItem("user-name")) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onLoginButtonClicked(username: string, password: string) {
    console.log(this.loginForm.value);
    username = username.toLowerCase();
    this.isSubmitted = true;//
    this.isLoading = true;//Bắt đầu hiệu ứng loading
    if (this.loginForm.invalid) {//Nếu form đăng nhập trống
      this.isLoading = false;//Ngắt hiệu ứng loading
      return;
    }
    this.authenService.login(username, password).subscribe((res: HttpResponse<any>) => {
      console.log("return: ", res);
      if (res.status === 200) {
        this.isLoading = false;
        this.router.navigate(['/home']);
      }

    },
      (error) => {
        console.log(error)
        if (error.status != 200) {
          if(error.error.data[0].messages[0].id == "Auth.form.error.confirmed"){
            this.isConfirmed = false;
          }
          this.isLoading = false;//Ngắt hiệu ứng loading!
          this.isLogin = false; //Nếu đăng nhập thất bại thì báo lỗi bên html!
        }
      });
  };
}