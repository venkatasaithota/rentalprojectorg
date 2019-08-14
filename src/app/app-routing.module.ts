import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourselComponent } from './coursel/coursel.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavComponent } from './nav/nav.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { OtpComponent } from './otp/otp.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nav/home',
    pathMatch: 'full'
  }
  ,
  {
    path: 'nav',
    component:NavComponent,
    children:[
      {
        path: 'home',
        component: CourselComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
    {path:'admin',loadChildren:()=>import('./admin/admin.module')},
    {path:'vendordashboard',loadChildren:()=>import('./vendor-dashboard/vendor-dashboard.module')},
    {path:'ownerdashboard',loadChildren:()=>import('./owner-dashboard/owner-dashboard.module')},
    {
      path:'forgetpassword',
      component:ForgetpasswordComponent,
    },
    {
      path:'otp',
      component:OtpComponent
    },
    {
      path:'changepassword',
      component:ChangepasswordComponent
    }
    
    ]
  }
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
