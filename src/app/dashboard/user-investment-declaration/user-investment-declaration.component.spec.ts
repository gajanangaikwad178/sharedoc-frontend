import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInvestmentDeclarationComponent } from './user-investment-declaration.component';

describe('UserInvestmentDeclarationComponent', () => {
  let component: UserInvestmentDeclarationComponent;
  let fixture: ComponentFixture<UserInvestmentDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInvestmentDeclarationComponent]
    });
    fixture = TestBed.createComponent(UserInvestmentDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
