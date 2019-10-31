import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

import { NbChatModule, NbIconModule, NbMenuModule, NbSidebarModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbAlertModule, NbCardModule, NbThemeModule, NbLayoutModule, NbTabsetModule, NbInputModule, NbButtonModule  } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';

import { AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    ProfileComponent,
    TrackingComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'https://us-central1-fir-basics-9f212.cloudfunctions.net/api',
          token: {
            class: NbAuthJWTToken,
            key: 'userToken'
          },
          login: {
            endpoint: '/auth/login',
            redirect: {
              success: '/home', 
              failure: null, 
            }
          },
          register: {
            endpoint: '/auth/register',
            redirect: {
              success: '/home',
              failure: null, 
            }
          },
          
        }),
      ],
      forms: {},
    }), 
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbTabsetModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
    NbCheckboxModule,
    NbUserModule,
    NbActionsModule,
    NbIconModule,
    NbChatModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
