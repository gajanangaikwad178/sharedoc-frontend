import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCalendarComponent } from './employee-calendar.component';

describe('EmployeeCalendarComponent', () => {
  let component: EmployeeCalendarComponent;
  let fixture: ComponentFixture<EmployeeCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCalendarComponent]
    });
    fixture = TestBed.createComponent(EmployeeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
