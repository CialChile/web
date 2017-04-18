import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsDetailsComponent } from './certifications-details.component';

describe('CertificationsDetailsComponent', () => {
  let component: CertificationsDetailsComponent;
  let fixture: ComponentFixture<CertificationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
