import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisorComponent } from './manage-supervisor.component';

describe('ManageSupervisorComponent', () => {
  let component: ManageSupervisorComponent;
  let fixture: ComponentFixture<ManageSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
