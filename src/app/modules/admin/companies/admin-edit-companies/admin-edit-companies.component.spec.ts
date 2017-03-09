import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCompaniesComponent } from './admin-edit-companies.component';

describe('AdminEditCompaniesComponent', () => {
  let component: AdminEditCompaniesComponent;
  let fixture: ComponentFixture<AdminEditCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
