import { async, TestBed } from '@angular/core/testing';
import { ManageSubcategoriesComponent } from './manage-subcategories.component';
describe('ManageSubcategoriesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ManageSubcategoriesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ManageSubcategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/categories/manage-subcategories/manage-subcategories.component.spec.js.map