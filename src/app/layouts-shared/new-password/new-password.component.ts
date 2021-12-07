import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthenService } from 'app/Services/authen.service';
import { Router,ActivatedRoute, Params  } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  private token: string;
  constructor(
    private authenService: AuthenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      this.token = params['token'];
    });
  }
  onLoginButtonClicked(password: string, passwordConfirmation: string) {
    this.authenService.newPassword(this.token, password, passwordConfirmation).subscribe((res: HttpResponse<any>) => {
      if (res.status === 200) {
        this.router.navigate(['/login']);
      }
      console.log(res);
    });
  };
}
