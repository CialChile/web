import { TestBed, inject } from '@angular/core/testing';
import { ToastrService } from './toastr.service';
describe('ToastrService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [ToastrService]
        });
    });
    it('should ...', inject([ToastrService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/toastr/toastr.service.spec.js.map