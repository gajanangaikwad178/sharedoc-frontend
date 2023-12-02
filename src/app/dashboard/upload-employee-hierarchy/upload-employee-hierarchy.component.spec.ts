import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEmployeeHierarchyComponent } from './upload-employee-hierarchy.component';

describe('UploadEmployeeHierarchyComponent', () => {
  let component: UploadEmployeeHierarchyComponent;
  let fixture: ComponentFixture<UploadEmployeeHierarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadEmployeeHierarchyComponent]
    });
    fixture = TestBed.createComponent(UploadEmployeeHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
