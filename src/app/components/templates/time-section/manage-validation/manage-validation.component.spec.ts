import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageValidationComponent } from './manage-validation.component';

describe('ManageValidationComponent', () => {
  let component: ManageValidationComponent;
  let fixture: ComponentFixture<ManageValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
