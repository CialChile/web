import { async, TestBed } from '@angular/core/testing';
import { AdminEditCompaniesComponent } from './admin-edit-companies.component';
describe('AdminEditCompaniesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AdminEditCompaniesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AdminEditCompaniesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-edit-companies/admin-edit-companies.component.spec.js.map