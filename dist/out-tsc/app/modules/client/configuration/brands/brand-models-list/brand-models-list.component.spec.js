import { async, TestBed } from '@angular/core/testing';
import { BrandModelsListComponent } from './brand-models-list.component';
describe('BrandModelsListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BrandModelsListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BrandModelsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/brand-models-list/brand-models-list.component.spec.js.map