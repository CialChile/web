import { TestBed, inject } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
describe('AdminGuard', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [AdminGuard]
        });
    });
    it('should ...', inject([AdminGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/admin.guard.spec.js.map