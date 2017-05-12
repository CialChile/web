import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityAssetsComponent } from './manage-activity-assets.component';

describe('ManageActivityAssetsComponent', () => {
  let component: ManageActivityAssetsComponent;
  let fixture: ComponentFixture<ManageActivityAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageActivityAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActivityAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
