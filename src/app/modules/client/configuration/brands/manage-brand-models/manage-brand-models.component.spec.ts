import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandModelsComponent } from './manage-brand-models.component';

describe('ManageBrandModelsComponent', () => {
  let component: ManageBrandModelsComponent;
  let fixture: ComponentFixture<ManageBrandModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBrandModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBrandModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
