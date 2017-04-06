import { async, TestBed } from '@angular/core/testing';
import { ManageWorkplacesComponent } from './manage-workplaces.component';
describe('ManageWorkplacesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ManageWorkplacesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ManageWorkplacesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/workplaces/manage-workplaces/manage-workplaces.component.spec.js.map