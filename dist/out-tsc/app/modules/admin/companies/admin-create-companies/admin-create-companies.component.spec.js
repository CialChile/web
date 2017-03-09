import { async, TestBed } from '@angular/core/testing';
import { AdminCreateCompaniesComponent } from './admin-create-companies.component';
describe('AdminCreateCompaniesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AdminCreateCompaniesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AdminCreateCompaniesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-create-companies/admin-create-companies.component.spec.js.map