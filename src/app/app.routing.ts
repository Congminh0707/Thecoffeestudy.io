import { TermsComponent } from './layouts-user/terms/terms.component';
import { PageNotFoundComponent } from './layouts-block/page-not-found/page-not-found.component';
import { TrackingComponent } from './layouts-user/tracking/tracking.component';
import { OrdersComponent } from './layouts-staff/orders/orders.component';
import { CouponComponent } from './layouts-user/coupon/coupon.component';
import { RewardsComponent } from './layouts-user/rewards/rewards.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './layouts-shared/signin/signin.component';
import { SignupComponent } from './layouts-shared/signup/signup.component';
import { ForgotPasswordComponent } from './layouts-shared/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './layouts-shared/new-password/new-password.component';
import { ViewUserComponent } from './layouts-user/view-user/view-user.component';
import { DashboardUserComponent } from './layouts-user/dashboard-user/dashboard-user.component';
import { DefaultStudyComponent } from './layouts-user/default-study/default-study.component';
import { DetailProductComponent } from './layouts-user/detail-product/detail-product.component';
import { TestQuizzesComponent } from './layouts-user/test-quizzes/test-quizzes.component';
import { BlogComponent } from './layouts-user/blog/blog.component';
import { CollectionsMenuComponent } from './layouts-user/collections-menu/collections-menu.component';
import { PayComponent } from './layouts-user/pay/pay.component';
import { RatingComponent } from './layouts-user/rating/rating.component';
import { SignupCourseComponent } from './layouts-user/signup-course/signup-course.component';
import { CartComponent } from './layouts-user/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'resetpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'newpassword/:token',
    component: NewPasswordComponent,
  },
  {
    path: 'signupCourse',
    component: SignupCourseComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'tracking/:oderId',
    component: TrackingComponent
  },
  //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  {
    path: '',
    component: ViewUserComponent,
    children: [
      {
        path: 'home',
        component: DashboardUserComponent,
      },
      {
        path: 'Blog',
        component: BlogComponent
      },
      {
        path: 'study',
        component: DefaultStudyComponent
      },
      {
        path: 'products-detail/:productId',
        component: DetailProductComponent
      },
      {
        path: 'TestQuizzes',
        component: TestQuizzesComponent
      },
      {
        path: 'Menu',
        component: CollectionsMenuComponent
      },
      {
        path: 'Pay',
        component: PayComponent
      },
      {
        path: 'Rating',
        component: RatingComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'rewards',
        component: RewardsComponent
      },
      {
        path: 'coupon',
        component: CouponComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      }
    ],
  },
  
  {
    path: '**', 
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
