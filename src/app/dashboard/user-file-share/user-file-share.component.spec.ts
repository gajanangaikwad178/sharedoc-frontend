import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileShareComponent } from './user-file-share.component';

describe('UserFileShareComponent', () => {
  let component: UserFileShareComponent;
  let fixture: ComponentFixture<UserFileShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFileShareComponent]
    });
    fixture = TestBed.createComponent(UserFileShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
