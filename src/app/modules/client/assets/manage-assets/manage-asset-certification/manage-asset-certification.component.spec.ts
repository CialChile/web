import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssetCertificationComponent } from './manage-asset-certification.component';

describe('ManageAssetCertificationComponent', () => {
  let component: ManageAssetCertificationComponent;
  let fixture: ComponentFixture<ManageAssetCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssetCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssetCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
