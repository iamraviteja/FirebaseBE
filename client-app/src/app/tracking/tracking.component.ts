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
  heartDataMeasured: any[] = [
    { CalendarDay: '', BloodPressure: '', PulsePressure: '', HeartRate: '' }
  ];
  chartData: any[] = [];
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  getWidth() : any {
    if (document.body.offsetWidth < 850) {
      return 400;
    }
    return 850;
  }

  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
  
  xAxis: any =
  {
      dataField: 'CalendarDay',
      showGridLines: true
  };

  seriesGroups: any[] =
  [
      {
          type: 'column',
          columnsGapPercent: 50,
          seriesGapPercent: 0,
          valueAxis:
          {
              unitInterval: 50,
              minValue: 50,
              maxValue: 200,
              displayValueAxis: true,
              description: 'Threshold',
              axisSize: 'auto',
              tickMarksColor: '#888888'
          },
          series: [
              { dataField: 'SystolicBloodPressure', displayText: 'Systolic Blood Pressure' },
              { dataField: 'DiastoleBloodPressure', displayText: 'Diastole Blood Pressure' },
              { dataField: 'HeartRate', displayText: 'Heart Rate' }
          ]
      }
  ];

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
      .subscribe(data => {
        this.heartDataMeasured = new Array(data);
        this.chartData = new Array();
        for (let count = 0 ; count < this.heartDataMeasured[0].length ; count++) {
          this.chartData.push(this.constructObjectForDataDepiction(this.heartDataMeasured[0][count]));
        }
        console.log(this.chartData);
      });
      
    }
  }

  constructObjectForDataDepiction(heartDataObjectFromService) {
    let calendarDay: String = new Date(heartDataObjectFromService.data.createdAt).getDate().toString();
    let systolicBloodPressure: String = heartDataObjectFromService.data.syspressure;
    let diastoleBloodPressure: String = heartDataObjectFromService.data.dispressure;
    let heartRate: String = heartDataObjectFromService.data.heartrate;
    return { 
      CalendarDay: calendarDay, 
      SystolicBloodPressure: systolicBloodPressure, 
      DiastoleBloodPressure: diastoleBloodPressure, 
      HeartRate: heartRate 
    };
  }

}
