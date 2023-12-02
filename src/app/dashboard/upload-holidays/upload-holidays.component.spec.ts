import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHolidaysComponent } from './upload-holidays.component';

describe('UploadHolidaysComponent', () => {
  let component: UploadHolidaysComponent;
  let fixture: ComponentFixture<UploadHolidaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadHolidaysComponent]
    });
    fixture = TestBed.createComponent(UploadHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
