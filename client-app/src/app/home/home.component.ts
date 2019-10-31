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

  constructor(private sidebarService: NbSidebarService) { 
    
  }

  ngOnInit() {}

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

}
