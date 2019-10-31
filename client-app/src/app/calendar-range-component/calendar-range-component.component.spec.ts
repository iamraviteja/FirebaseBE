import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRangeComponentComponent } from './calendar-range-component.component';

describe('CalendarRangeComponentComponent', () => {
  let component: CalendarRangeComponentComponent;
  let fixture: ComponentFixture<CalendarRangeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarRangeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarRangeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
