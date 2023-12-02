import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddTaskComponent } from './user-add-task.component';

describe('UserAddTaskComponent', () => {
  let component: UserAddTaskComponent;
  let fixture: ComponentFixture<UserAddTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddTaskComponent]
    });
    fixture = TestBed.createComponent(UserAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
