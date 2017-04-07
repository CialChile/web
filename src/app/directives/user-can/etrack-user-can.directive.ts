import {TemplateRef, ViewContainerRef, AfterContentInit, Directive, Input} from '@angular/core';

@Directive({
  selector: '[userCan]'
})
export class EtrackUserCanDirective implements AfterContentInit {
  private permission;
  private initialized: Boolean = false;
  private strategies = [
    'remove',
    'disable'
  ];

  private defaultDeniedStrategy = 'remove';
  private deniedStrategy;

  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainer: ViewContainerRef) {
  }

  @Input('userCan') set userCan(value: string) {
    this.permission = value;
  }

  @Input() set userCanDeniedStrategy(value: string) {
    this.deniedStrategy = value;
  };

  ngAfterContentInit() {
    this.performPermissionAction(this.permission == 'any' || this.permission == '' ? true : this.checkPermission());
  }

  checkPermission(): boolean {
    this.deniedStrategy = this.deniedStrategy ? this.deniedStrategy : this.defaultDeniedStrategy;
    let permissions: Array<string> = JSON.parse(localStorage.getItem('permissions'));
    if (!permissions) {
      permissions = [];
    }
    let permissionExist = permissions.filter((permission) => {
      return permission == this.permission;
    });

    return permissionExist.length > 0;

  }

  private performPermissionAction(userHavePermission) {
    if (!userHavePermission) {
      switch (this.deniedStrategy) {
        case 'remove':
          this._viewContainer.clear();
          break;
        case 'disable':
          let element = this._viewContainer.createEmbeddedView(this._templateRef);
          element.rootNodes[0].classList.add('link-disabled');
          element.rootNodes[0].setAttribute('disabled', true);
          break;
        default:
          this._viewContainer.clear();
      }
    } else {
      let element = this._viewContainer.createEmbeddedView(this._templateRef);
      element.rootNodes[0].classList.remove('link-disabled');
      element.rootNodes[0].removeAttribute('disabled');
    }
  }
}
