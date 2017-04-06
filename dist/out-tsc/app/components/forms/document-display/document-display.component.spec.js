import { async, TestBed } from '@angular/core/testing';
import { DocumentDisplayComponent } from './document-display.component';
describe('DocumentDisplayComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DocumentDisplayComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DocumentDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/components/forms/document-display/document-display.component.spec.js.map