import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

import { NbChatModule, NbIconModule, NbMenuModule, NbSidebarModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbAlertModule, NbCardModule, NbThemeModule, NbLayoutModule, NbTabsetModule, NbInputModule, NbButtonModule, NbSelectModule, NbCalendarRangeModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

import { AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ChatComponent } from './chat/chat.component';
import { CalendarRangeComponentComponent } from './calendar-range-component/calendar-range-component.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    ProfileComponent,
    TrackingComponent,
    ChatComponent,
    CalendarRangeComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbEvaIconsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    NbCalendarRangeModule,
    jqxChartModule,
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
