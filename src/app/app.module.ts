import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CourselComponent } from './coursel/coursel.component';
import {FormsModule} from '@angular/forms';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminModule } from './admin/admin.module';
import { AuthorizationService } from './authorization.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { OtpComponent } from './otp/otp.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OwnerDashboardModule } from './owner-dashboard/owner-dashboard.module';
import { VendorDashboardModule } from './vendor-dashboard/vendor-dashboard.module';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CourselComponent,
    AboutusComponent,
    LoginComponent,
    RegistrationComponent,
    ForgetpasswordComponent,
    OtpComponent,
    ChangepasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwnerDashboardModule,
    VendorDashboardModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
