import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutesListComponent } from './institutes-list.component';

describe('InstitutesListComponent', () => {
  let component: InstitutesListComponent;
  let fixture: ComponentFixture<InstitutesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
