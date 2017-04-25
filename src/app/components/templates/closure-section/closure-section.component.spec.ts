import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureSectionComponent } from './closure-section.component';

describe('ClosureSectionComponent', () => {
  let component: ClosureSectionComponent;
  let fixture: ComponentFixture<ClosureSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosureSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosureSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
