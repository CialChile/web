import { TestBed, inject } from '@angular/core/testing';
import { PermissionGuard } from './permission.guard';
describe('PermissionGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PermissionGuard]
        });
    });
    it('should ...', inject([PermissionGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/permission.guard.spec.js.map