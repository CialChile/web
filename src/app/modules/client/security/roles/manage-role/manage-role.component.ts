import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit {

  public roleForm: any;
  public saving: boolean = false;
  public basePermissions: any[];
  public roleId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Rol';
  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Securidad',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Roles',
      link: '/client/security/roles',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/security/roles/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.roleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      listAll: [true],
      showAll: [true],
      storeAll: [true],
      updateAll: [true],
      destroyAll: [true],
      permissions: this.formBuilder.array([]), // <-- secretLairs as an empty FormArray
    });

    this.roleForm.controls['listAll'].valueChanges.subscribe((value) => {
      this.checkAll('list', value);
    });
    this.roleForm.controls['storeAll'].valueChanges.subscribe((value) => {
      this.checkAll('store', value);
    });
    this.roleForm.controls['showAll'].valueChanges.subscribe((value) => {
      this.checkAll('show', value);
    });
    this.roleForm.controls['updateAll'].valueChanges.subscribe((value) => {
      this.checkAll('update', value);
    });
    this.roleForm.controls['destroyAll'].valueChanges.subscribe((value) => {
      this.checkAll('destroy', value);
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Rol';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/security/roles/' + params['id'];
        this.roleId = params['id'];
        this.loading = true;
        this.apiService.one('client/roles', params['id'], 'permissions').subscribe((role) => {
          this.apiService.all('client/permissions').subscribe((response) => {
            this.configurePermissions(response);
            role.data.permissions = response.map((value, index) => {
              for (let i = 0; i < role.data.permissions.length; i++) {
                if (role.data.permissions[i].slug === value.abilitiesList.slug) {
                  return role.data.permissions[i];
                }
              }
              return value.abilitiesList;
            });
            this.loading = false;
            this.initForm(role.data)
          }, (error) => {
            this.loading = false;
          });
        }, (error) => {
          this.loading = false;
        })
      } else {
        this.apiService.all('client/permissions').subscribe((response) => {
          this.configurePermissions(response)
        })
      }
    });
  }

  initForm(role) {
    role.listAll = true;
    role.storeAll = true;
    role.showAll = true;
    role.updateAll = true;
    role.destroyAll = true;
    if (role.permissions.length) {
      role.listAll = role.permissions.reduce(function (prev, current) {
        let previousValue = prev;
        if (prev.hasOwnProperty('list')) {
          previousValue = prev.list
        }
        return previousValue && current.list
      });

      role.storeAll = role.permissions.reduce(function (prev, current) {
        let previousValue = prev;
        if (prev.hasOwnProperty('store')) {
          previousValue = prev.store
        }
        return previousValue && current.store
      });

      role.showAll = role.permissions.reduce(function (prev, current) {
        let previousValue = prev;
        if (prev.hasOwnProperty('show')) {
          previousValue = prev.show
        }
        return previousValue && current.show
      });

      role.updateAll = role.permissions.reduce(function (prev, current) {
        let previousValue = prev;
        if (prev.hasOwnProperty('update')) {
          previousValue = prev.update
        }
        return previousValue && current.update
      });

      role.destroyAll = role.permissions.reduce(function (prev, current) {
        let previousValue = prev;
        if (prev.hasOwnProperty('destroy')) {
          previousValue = prev.destroy
        }
        return previousValue && current.destroy
      });
    } else {
      role.permissions = this.permissions.value;
    }
    this.roleForm.reset(role)
  }

  get permissions(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  };

  onSubmit() {
    let data = this.roleForm.value;
    this.saving = true;
    if (this.roleId) {
      this.apiService.update('client/roles', this.roleId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Rol actualizado con exito');
          this.router.navigate(['/client/security/roles'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/roles', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Rol creado con exito');
          this.router.navigate(['/client/security/roles'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/security/roles'])
  }

  checkAll(type, value) {
    let perm = this.permissions.value;
    perm.map((permission) => {
      return permission[type] = value;
    });
    this.permissions.setValue(perm);
  }

  configurePermissions(response) {
    this.basePermissions = response;
    const permissionsFGs = this.basePermissions.map((permission) => {
      let perm = permission.abilitiesList;
      perm.name = permission.name;
      perm.slug = permission.slug;
      return this.formBuilder.group(perm)
    });
    const permissionsFormArray = this.formBuilder.array(permissionsFGs);
    this.roleForm.setControl('permissions', permissionsFormArray);
  }

}
