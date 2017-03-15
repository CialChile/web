import { TestBed, inject } from '@angular/core/testing';
import { ClientGuard } from './client.guard';
describe('ClientGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClientGuard]
        });
    });
    it('should ...', inject([ClientGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/modules/auth/guards/client.guard.spec.js.map