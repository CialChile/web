import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkplacesComponent } from './manage-workplaces.component';

describe('ManageWorkplacesComponent', () => {
  let component: ManageWorkplacesComponent;
  let fixture: ComponentFixture<ManageWorkplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
