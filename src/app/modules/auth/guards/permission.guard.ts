import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from "../../../services/toastr/toastr.service";

@Injectable()
export class PermissionGuard implements CanActivate,CanActivateChild {
  constructor(private router: Router, public toastr: ToastrService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const routePermission = next.data['permission'];
    let permissions: Array<string> = JSON.parse(localStorage.getItem('permissions'));
    if (!permissions) {
      permissions = [];
    }
    let permissionExist = permissions.filter((permission) => {
      return permission == routePermission;
    });

    if (permissionExist.length > 0) {
      return true;
    }

    //this.toastr.showError('No tienes permiso para acceder a este recurso');

    const redirectTo = next.data['redirectTo'];
    this.toastr.showError('No tiene permisos para acceder a esta sección');

    if (redirectTo) {
      this.router.navigate([redirectTo]);
      return false;
    }

    this.router.navigate(['/']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
