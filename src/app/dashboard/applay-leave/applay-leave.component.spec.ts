import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplayLeaveComponent } from './applay-leave.component';

describe('ApplayLeaveComponent', () => {
  let component: ApplayLeaveComponent;
  let fixture: ComponentFixture<ApplayLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplayLeaveComponent]
    });
    fixture = TestBed.createComponent(ApplayLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
