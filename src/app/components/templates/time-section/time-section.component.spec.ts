import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSectionComponent } from './time-section.component';

describe('TimeSectionComponent', () => {
  let component: TimeSectionComponent;
  let fixture: ComponentFixture<TimeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
