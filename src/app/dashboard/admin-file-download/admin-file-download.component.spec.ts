import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileDownloadComponent } from './admin-file-download.component';

describe('AdminFileDownloadComponent', () => {
  let component: AdminFileDownloadComponent;
  let fixture: ComponentFixture<AdminFileDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFileDownloadComponent]
    });
    fixture = TestBed.createComponent(AdminFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
