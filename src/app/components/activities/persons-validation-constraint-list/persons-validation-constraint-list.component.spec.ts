import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsValidationConstraintListComponent } from './persons-validation-constraint-list.component';

describe('PersonsValidationConstraintListComponent', () => {
  let component: PersonsValidationConstraintListComponent;
  let fixture: ComponentFixture<PersonsValidationConstraintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsValidationConstraintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsValidationConstraintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
