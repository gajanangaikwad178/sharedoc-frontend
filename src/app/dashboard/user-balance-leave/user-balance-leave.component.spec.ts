import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBalanceLeaveComponent } from './user-balance-leave.component';

describe('UserBalanceLeaveComponent', () => {
  let component: UserBalanceLeaveComponent;
  let fixture: ComponentFixture<UserBalanceLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBalanceLeaveComponent]
    });
    fixture = TestBed.createComponent(UserBalanceLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
