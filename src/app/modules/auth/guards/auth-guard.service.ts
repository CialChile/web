import {Injectable} from '@angular/core';
import {Router, CanActivateChild} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate() {
        if (this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }
}