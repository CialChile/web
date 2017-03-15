import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });
    it('should ...', inject([UserService], (service) => {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/user.service.spec.js.map