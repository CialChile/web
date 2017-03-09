import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
describe('UserService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });
    it('should ...', inject([UserService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/services/user.service.spec.js.map