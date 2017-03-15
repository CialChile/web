import { TestBed, inject } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
describe('AdminGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdminGuard]
        });
    });
    it('should ...', inject([AdminGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/admin.guard.spec.js.map