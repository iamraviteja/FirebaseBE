import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ChatComponent } from './chat/chat.component';

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
  { path: 'home', 
    canActivate: [AuthGuard], 
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'tracking',
        component: TrackingComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  },
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
