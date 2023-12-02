import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDeclarationUploadByAdminComponent } from './investment-declaration-upload-by-admin.component';

describe('InvestmentDeclarationUploadByAdminComponent', () => {
  let component: InvestmentDeclarationUploadByAdminComponent;
  let fixture: ComponentFixture<InvestmentDeclarationUploadByAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentDeclarationUploadByAdminComponent]
    });
    fixture = TestBed.createComponent(InvestmentDeclarationUploadByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
