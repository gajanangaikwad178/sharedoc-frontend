import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileDownloadComponent } from './user-file-download.component';

describe('UserFileDownloadComponent', () => {
  let component: UserFileDownloadComponent;
  let fixture: ComponentFixture<UserFileDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFileDownloadComponent]
    });
    fixture = TestBed.createComponent(UserFileDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
