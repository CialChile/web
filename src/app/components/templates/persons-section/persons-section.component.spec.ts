import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsSectionComponent } from './persons-section.component';

describe('PersonsSectionComponent', () => {
  let component: PersonsSectionComponent;
  let fixture: ComponentFixture<PersonsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
