import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeValidationConstraintListComponent } from './time-validation-constraint-list.component';

describe('TimeValidationConstraintListComponent', () => {
  let component: TimeValidationConstraintListComponent;
  let fixture: ComponentFixture<TimeValidationConstraintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeValidationConstraintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeValidationConstraintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
