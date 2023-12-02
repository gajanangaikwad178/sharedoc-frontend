import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpcomingHolidayComponent } from './user-upcoming-holiday.component';

describe('UserUpcomingHolidayComponent', () => {
  let component: UserUpcomingHolidayComponent;
  let fixture: ComponentFixture<UserUpcomingHolidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpcomingHolidayComponent]
    });
    fixture = TestBed.createComponent(UserUpcomingHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
