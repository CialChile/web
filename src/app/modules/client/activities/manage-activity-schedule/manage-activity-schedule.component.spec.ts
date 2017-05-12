import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityScheduleComponent } from './manage-activity-schedule.component';

describe('ManageActivityScheduleComponent', () => {
  let component: ManageActivityScheduleComponent;
  let fixture: ComponentFixture<ManageActivityScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageActivityScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActivityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
