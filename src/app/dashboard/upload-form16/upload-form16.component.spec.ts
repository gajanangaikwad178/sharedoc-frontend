import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadForm16Component } from './upload-form16.component';

describe('UploadForm16Component', () => {
  let component: UploadForm16Component;
  let fixture: ComponentFixture<UploadForm16Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadForm16Component]
    });
    fixture = TestBed.createComponent(UploadForm16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
