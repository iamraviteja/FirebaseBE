import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  user = {};
  token:any = false;

  constructor(private authService: NbAuthService, private http: HttpClient) { 
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

      this.http.get(`https://us-central1-fir-basics-9f212.cloudfunctions.net/api/weightdata`, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      })
      .subscribe(data =>{
        console.log(data);
      });

      this.http.get(`https://us-central1-fir-basics-9f212.cloudfunctions.net/api/heartdata`, {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      })
      .subscribe(data =>{
        console.log(data);
      });
      
    }
  }

}
