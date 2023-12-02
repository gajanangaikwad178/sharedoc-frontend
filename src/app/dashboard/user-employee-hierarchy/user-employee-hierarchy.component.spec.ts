import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmployeeHierarchyComponent } from './user-employee-hierarchy.component';

describe('UserEmployeeHierarchyComponent', () => {
  let component: UserEmployeeHierarchyComponent;
  let fixture: ComponentFixture<UserEmployeeHierarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEmployeeHierarchyComponent]
    });
    fixture = TestBed.createComponent(UserEmployeeHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
