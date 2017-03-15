import { async, TestBed } from '@angular/core/testing';
import { AdminEditCompaniesComponent } from './admin-edit-companies.component';
describe('AdminEditCompaniesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminEditCompaniesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AdminEditCompaniesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/admin/companies/admin-edit-companies/admin-edit-companies.component.spec.js.map