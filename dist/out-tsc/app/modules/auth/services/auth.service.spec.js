import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
describe('AuthService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AuthService]
        });
    });
    it('should ...', inject([AuthService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/auth.service.spec.js.map