import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../../../../components/forms/validation/validation.service";

@Component({
  selector: 'app-admin-manage-user',
  templateUrl: './admin-manage-user.component.html',
  styleUrls: ['./admin-manage-user.component.scss']
})
export class AdminManageUserComponent implements OnInit {
  private userForm: any;
  private saving: boolean = false;
  private userId: number;
  private loading: boolean = false;
  private title: string = 'Nuevo Usuario';
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
      title: 'Usuarios',
      link: '/admin/security/users',
      active: false
    },
    {
      title: 'Crear',
      link: '/admin/security/users/create',
      active: true
    }
  ];
  private roles: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [{
        value: '',
        disabled: false
      }, [Validators.compose([Validators.required, ValidationService.emailValidator])]],
      role: ['', [Validators.required]],
      active: [true],
    });
  }

  ngOnInit() {
    this.apiService.all('admin/roles').subscribe((roles) => {
      this.roles = roles.data
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Usuario';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/admin/security/users/' + params['id'];
        this.userId = params['id'];
        this.loading = true;
        this.userForm.controls.email.disable();
        this.apiService.one('admin/users', params['id'],'role').subscribe((user) => {
          this.loading = false;
          user.data.role = user.data.role.id;
          this.initForm(user.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(user) {
    this.userForm.reset(user)
  }

  onSubmit() {
    let data = this.userForm.value;
    this.saving = true;
    if (this.userId) {
      this.apiService.update('admin/users', this.userId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Usuario actualizado con exito');
          this.router.navigate(['/admin/security/users'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('admin/users', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Usuario creado con exito');
          this.router.navigate(['/admin/security/users'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/admin/security/users'])
  }
}
