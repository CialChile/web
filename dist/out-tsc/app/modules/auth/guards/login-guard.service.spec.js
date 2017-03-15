import { TestBed, inject } from '@angular/core/testing';
import { LoginGuardService } from './login-guard.service';
describe('LoginGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginGuardService]
        });
    });
    it('should ...', inject([LoginGuardService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/login-guard.service.spec.js.map