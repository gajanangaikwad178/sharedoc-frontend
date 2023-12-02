import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaveStatusComponent } from './user-leave-status.component';

describe('UserLeaveStatusComponent', () => {
  let component: UserLeaveStatusComponent;
  let fixture: ComponentFixture<UserLeaveStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeaveStatusComponent]
    });
    fixture = TestBed.createComponent(UserLeaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
