import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJoiningFormComponent } from './employee-joining-form.component';

describe('EmployeeJoiningFormComponent', () => {
  let component: EmployeeJoiningFormComponent;
  let fixture: ComponentFixture<EmployeeJoiningFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeJoiningFormComponent]
    });
    fixture = TestBed.createComponent(EmployeeJoiningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
