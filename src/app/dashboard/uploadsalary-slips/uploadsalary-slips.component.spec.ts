import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsalarySlipsComponent } from './uploadsalary-slips.component';

describe('UploadsalarySlipsComponent', () => {
  let component: UploadsalarySlipsComponent;
  let fixture: ComponentFixture<UploadsalarySlipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadsalarySlipsComponent]
    });
    fixture = TestBed.createComponent(UploadsalarySlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
