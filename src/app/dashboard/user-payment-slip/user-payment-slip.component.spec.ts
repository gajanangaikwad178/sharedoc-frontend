import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentSlipComponent } from './user-payment-slip.component';

describe('UserPaymentSlipComponent', () => {
  let component: UserPaymentSlipComponent;
  let fixture: ComponentFixture<UserPaymentSlipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPaymentSlipComponent]
    });
    fixture = TestBed.createComponent(UserPaymentSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
