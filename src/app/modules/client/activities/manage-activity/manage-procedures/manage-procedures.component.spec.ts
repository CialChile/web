import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProceduresComponent } from './manage-procedures.component';

describe('ManageProceduresComponent', () => {
  let component: ManageProceduresComponent;
  let fixture: ComponentFixture<ManageProceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
