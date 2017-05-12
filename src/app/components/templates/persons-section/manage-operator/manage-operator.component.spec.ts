import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOperatorComponent } from './manage-operator.component';

describe('ManageOperatorComponent', () => {
  let component: ManageOperatorComponent;
  let fixture: ComponentFixture<ManageOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
