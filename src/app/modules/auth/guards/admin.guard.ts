import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../services/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.getUser().map((user)=> {
            if (!user['isSuperUser']) {
                this.router.navigate(['/login']);
                return Observable.of(false);
            }

            return !!user['isSuperUser'];
        });
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
