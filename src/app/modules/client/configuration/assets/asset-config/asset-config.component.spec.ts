import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetConfigComponent } from './asset-config.component';

describe('AssetConfigComponent', () => {
  let component: AssetConfigComponent;
  let fixture: ComponentFixture<AssetConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
