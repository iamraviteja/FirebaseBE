import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = {};
  token:any = false;
  items = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home/landing',
    },
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/home/profile',
    },
    {
      title: 'Tracking',
      icon: { icon: 'bar-chart-outline', pack: 'eva' },
      link: '/home/tracking',
    },
    {
      title: 'Chat',
      icon: { icon: 'message-square-outline', pack: 'eva' },
      link: '/home/chat',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: '/auth/logout',
    },
  ];

  constructor(private authService: NbAuthService, private http: HttpClient, private sidebarService: NbSidebarService) { 
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload(); 
        this.token = token.toString();
      }

    });
  }

  ngOnInit() {
    if(this.token){
      this.http.get(`https://us-central1-fir-basics-9f212.cloudfunctions.net/api/posts`, {
        headers: new HttpHeaders({
          'Content-Type':  'application/xml',
          'Authorization': `Bearer ${this.token}`
        })
      })
      .subscribe(data =>{
        console.log(data);
      });
    }
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

}
