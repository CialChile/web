import { TestBed, inject } from '@angular/core/testing';
import { LoginGuardService } from './login-guard.service';
describe('LoginGuardService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [LoginGuardService]
        });
    });
    it('should ...', inject([LoginGuardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/login-guard.service.spec.js.map