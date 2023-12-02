import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form16ForUserComponent } from './form16-for-user.component';

describe('Form16ForUserComponent', () => {
  let component: Form16ForUserComponent;
  let fixture: ComponentFixture<Form16ForUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Form16ForUserComponent]
    });
    fixture = TestBed.createComponent(Form16ForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
