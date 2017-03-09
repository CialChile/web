import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCompaniesComponent } from './admin-create-companies.component';

describe('AdminCreateCompaniesComponent', () => {
  let component: AdminCreateCompaniesComponent;
  let fixture: ComponentFixture<AdminCreateCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
