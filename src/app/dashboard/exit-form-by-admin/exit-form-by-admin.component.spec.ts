import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitFormByAdminComponent } from './exit-form-by-admin.component';

describe('ExitFormByAdminComponent', () => {
  let component: ExitFormByAdminComponent;
  let fixture: ComponentFixture<ExitFormByAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitFormByAdminComponent]
    });
    fixture = TestBed.createComponent(ExitFormByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
