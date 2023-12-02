import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExitFormComponent } from './user-exit-form.component';

describe('UserExitFormComponent', () => {
  let component: UserExitFormComponent;
  let fixture: ComponentFixture<UserExitFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserExitFormComponent]
    });
    fixture = TestBed.createComponent(UserExitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
