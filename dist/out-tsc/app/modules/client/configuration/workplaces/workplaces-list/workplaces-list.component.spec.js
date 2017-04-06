import { async, TestBed } from '@angular/core/testing';
import { WorkplacesListComponent } from './workplaces-list.component';
describe('WorkplacesListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [WorkplacesListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(WorkplacesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/client/configuration/workplaces/workplaces-list/workplaces-list.component.spec.js.map