import { PipeMoney } from './models/pipe-money';
import { AuthenService } from 'app/Services/authen.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { SignupComponent } from './layouts-shared/signup/signup.component';
import { SigninComponent } from './layouts-shared/signin/signin.component';
import { ForgotPasswordComponent } from './layouts-shared/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './layouts-shared/new-password/new-password.component';
import { ViewUserComponent } from './layouts-user/view-user/view-user.component';
import { DashboardUserComponent } from './layouts-user/dashboard-user/dashboard-user.component';
import { DefaultStudyComponent } from './layouts-user/default-study/default-study.component';
import { DetailProductComponent } from './layouts-user/detail-product/detail-product.component';
import { RatingComponent } from './layouts-user/rating/rating.component';
import { TestQuizzesComponent } from './layouts-user/test-quizzes/test-quizzes.component';
import { CollectionsMenuComponent } from './layouts-user/collections-menu/collections-menu.component';
import { BlogComponent } from './layouts-user/blog/blog.component';
import { PayComponent } from './layouts-user/pay/pay.component';
import { SignupCourseComponent } from './layouts-user/signup-course/signup-course.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClassService } from './Services/class.service';
import { ProductService } from './Services/product.service';
import { WebRequestService } from './Services/web-request.service';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CartComponent } from './layouts-user/cart/cart.component';
import { RewardsComponent } from './layouts-user/rewards/rewards.component';
import { CouponComponent } from './layouts-user/coupon/coupon.component';
import { ModalModule } from 'ng2-modal-module';
import { ModalComponent } from './layouts-user/pay/modal/modal.component';
import { OrdersComponent } from './layouts-staff/orders/orders.component';
import { TrackingComponent } from './layouts-user/tracking/tracking.component';
import { MenuComponent } from './layouts-block/menu/menu.component';
import { FooterComponent } from './layouts-block/footer/footer.component';
import { HeaderComponent } from './layouts-block/header/header.component';
import { BannerComponent } from './layouts-block/banner/banner.component';
import { NavbarComponent } from './layouts-block/navbar/navbar.component';
import { SidebarComponent } from './layouts-block/sidebar/sidebar.component';
import { PageNotFoundComponent } from './layouts-block/page-not-found/page-not-found.component';
import { TermsComponent } from './layouts-user/terms/terms.component';
import { MemberProfileComponent } from './layouts-user/member-profile/member-profile.component';
import { ClubManagerComponent } from './layouts-user/club-manager/club-manager.component';
import { ProfileUserComponent } from './layouts-user/profile-user/profile-user.component';
import { EventComponent } from './layouts-user/event/event.component';
import { CalendarComponent } from './layouts-user/calendar/calendar.component';
import { BookingComponent } from './layouts-user/booking/booking.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ModalModule,
    AppRoutingModule,
    FileUploadModule,
    AngularFileUploaderModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    NavbarComponent,
    SidebarComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ViewUserComponent,
    DashboardUserComponent,
    MenuComponent,
    DefaultStudyComponent,
    DetailProductComponent,
    RatingComponent,
    TestQuizzesComponent,
    CollectionsMenuComponent,
    BlogComponent,
    PayComponent,
    SignupCourseComponent,
    CartComponent,
    RewardsComponent,
    CouponComponent,
    ModalComponent,
    OrdersComponent,
    TrackingComponent,
    PageNotFoundComponent,
    TermsComponent,
    MemberProfileComponent,
    ClubManagerComponent,
    ProfileUserComponent,
    EventComponent,
    CalendarComponent,
    BookingComponent,
    PipeMoney
  ],
  providers: [
    AuthenService,
    ClassService,
    ProductService,
    WebRequestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
