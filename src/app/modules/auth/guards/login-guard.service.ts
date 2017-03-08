import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserService} from "../services/user.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    }

    canActivate() {
        if (this.auth.loggedIn()) {
            return this.userService.getUser().map((user)=> {
                if (user['isSuperUser']) {
                    this.router.navigate(['/admin']);
                    return false;
                }
                this.router.navigate(['/dashboard']);
                return false;
            })
        }
        return true;
    }

}
