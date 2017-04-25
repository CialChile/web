import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgramTypeComponent } from './manage-program-type.component';

describe('ManageProgramTypeComponent', () => {
  let component: ManageProgramTypeComponent;
  let fixture: ComponentFixture<ManageProgramTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProgramTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProgramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
