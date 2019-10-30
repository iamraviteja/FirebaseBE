import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
} from '@nebular/auth';

const routes: Routes = [
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      }
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
