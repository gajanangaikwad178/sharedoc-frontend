import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEmployeeRegistrationComponent } from './bulk-employee-registration.component';

describe('BulkEmployeeRegistrationComponent', () => {
  let component: BulkEmployeeRegistrationComponent;
  let fixture: ComponentFixture<BulkEmployeeRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkEmployeeRegistrationComponent]
    });
    fixture = TestBed.createComponent(BulkEmployeeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
