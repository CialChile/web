import { TestBed, inject } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
describe('AuthGuardService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthGuardService]
        });
    });
    it('should ...', inject([AuthGuardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/auth-guard.service.spec.js.map