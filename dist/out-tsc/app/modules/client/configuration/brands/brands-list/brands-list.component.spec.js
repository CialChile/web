import { async, TestBed } from '@angular/core/testing';
import { BrandsListComponent } from './brands-list.component';
describe('BrandsListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [BrandsListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BrandsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/brands/brands-list/brands-list.component.spec.js.map