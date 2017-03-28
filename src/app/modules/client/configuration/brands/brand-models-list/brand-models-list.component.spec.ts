import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModelsListComponent } from './brand-models-list.component';

describe('BrandModelsListComponent', () => {
  let component: BrandModelsListComponent;
  let fixture: ComponentFixture<BrandModelsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandModelsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandModelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
