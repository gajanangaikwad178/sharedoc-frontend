import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavesComponent } from './add-leaves.component';

describe('AddLeavesComponent', () => {
  let component: AddLeavesComponent;
  let fixture: ComponentFixture<AddLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLeavesComponent]
    });
    fixture = TestBed.createComponent(AddLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
