import { Component, OnInit } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';

@Component({
  selector: 'app-calendar-range-component',
  templateUrl: './calendar-range-component.component.html',
  styleUrls: ['./calendar-range-component.component.scss']
})
export class CalendarRangeComponentComponent implements OnInit {
  
  range: NbCalendarRange<Date>;
  
  constructor(protected dateService: NbDateService<Date>) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };
  }

  ngOnInit() {
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

}
