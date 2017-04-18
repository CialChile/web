import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkerCertificationsComponent } from './manage-worker-certifications.component';

describe('ManageWorkerCertificationsComponent', () => {
  let component: ManageWorkerCertificationsComponent;
  let fixture: ComponentFixture<ManageWorkerCertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkerCertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkerCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
