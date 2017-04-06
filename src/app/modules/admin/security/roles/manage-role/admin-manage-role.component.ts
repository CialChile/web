import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-manage-role',
  templateUrl: './admin-manage-role.component.html',
  styleUrls: ['./admin-manage-role.component.scss']
})
export class AdminManageRoleComponent implements OnInit {

  private roleForm: any;
  private saving: boolean = false;
  private basePermissions: any[];
  private roleId: number;
  private loading: boolean = false;
  private title: string = 'Nuevo Rol';
  private breadcrumbs = [
    {
      title: 'Home',
      link: '/admin/dashboard',
      active: false
    },
    {
      title: 'Securidad',
      link: '/admin/dashboard',
      active: false
    },
    {
      title: 'Roles',
      link: '/admin/security/roles',
      active: false
    },
    {
      title: 'Crear',
      link: '/admin/security/roles/create',
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
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/admin/security/roles/' + params['id'];
        this.roleId = params['id'];
        this.loading = true;
        this.apiService.one('admin/roles', params['id'], 'permissions').subscribe((role) => {
          this.apiService.all('admin/permissions').subscribe((response) => {
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
        this.apiService.all('admin/permissions').subscribe((response) => {
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
      this.apiService.update('admin/roles', this.roleId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Rol actualizado con exito');
          this.router.navigate(['/admin/security/roles'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('admin/roles', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Rol creado con exito');
          this.router.navigate(['/admin/security/roles'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/admin/security/roles'])
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
