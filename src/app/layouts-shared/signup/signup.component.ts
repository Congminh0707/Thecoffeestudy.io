import { CartItem } from './../../models/cart-item';
import { User } from 'app/models/user.model';
import { data } from 'jquery';
import { WebRequestService } from './../../Services/web-request.service';
import { CartService } from './../../Services/cart.service';
import { HttpResponse, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'app/Services/authen.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userId;
  signupForm: FormGroup;
  checkInvalid = false; //Khi điền form thiếu sẽ thanh true
  checkPass = false; // Nếu nhập lại password sai sẽ thành true, báo lỗi.
  isSubmitted = false;// Khi nhấn button đăng kí sẽ thành true.
  isLoading = false;//Khi nhấn button đăng kí sẽ thành true.(bắt đầu hiệu ứng loading)
  isSignup = true;//False khi không nhập form thông tin.
  isUsername = false;// True khi lỗi trùng tên đăng nhập
  isEmail = false;// True khi trùng email
  get formControls() { return this.signupForm.controls; }
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
  ) { }
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8),]],
      enterpassword: ['', Validators.required],
    });
  }

  onSignupButtonClicked(username: string, email: string, password: string, enterpassWord: string) {
    username = username.toLowerCase()
    console.log(this.signupForm.value);
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.signupForm.invalid || this.formControls.username.errors?.required || this.formControls.email.errors?.required
      || this.formControls.password.errors?.required || this.formControls.enterpassword.errors?.required || this.checkPassWord(password, enterpassWord)) {
      this.isLoading = false;
      console.log(this.formControls.username.errors)
      this.checkInvalid = true;
      return;
    }

    this.checkPassWord(password, enterpassWord)
    this.authenService.signup( username, email, password).subscribe((res: HttpResponse<any>) => {
      this.isLoading = false;
      console.log(res);
      this.userId = res.body.user.id;
      this.cartService.createCart().subscribe((res: CartItem) =>{
        console.log(res)
        let cart = res.id;
        this.authenService.updateUser(cart,this.userId).subscribe((res: HttpResponse<any>) =>{
          console.log(res);
        })
      });
    },
     (error) =>{
      this.isLoading = false;
      this.isSignup = false;
      this.checkRes(error.error.data[0].messages[0].id,error.error.data[0].messages[0].message);
      console.log(error.error)
    });
    
  }
  // hàm kiểm tra password 
  checkPassWord(passWord: string, enterpassWord: string){
    if(!(passWord === enterpassWord)){
      this.checkPass = true;
      return true;
    }
    this.checkPass = false;
    return false;
  }

  checkRes(id: string, message: string){
    this.isEmail= false;
    this.isUsername = false;
    console.log(id,message)
    if(id === "Auth.form.error.email.taken"){
      if(message === "Email is already taken."){
        this.isEmail = true;
      }
      if(message === "Email already taken"){
        this.isUsername = true;
      }
    }
  }
}
