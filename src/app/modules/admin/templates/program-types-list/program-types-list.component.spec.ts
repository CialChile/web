import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramTypesListComponent } from './program-types-list.component';

describe('ProgramTypesListComponent', () => {
  let component: ProgramTypesListComponent;
  let fixture: ComponentFixture<ProgramTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
