import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {ValidationService} from "../../../../../components/forms/validation/validation.service";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  private userForm: any;
  private saving: boolean = false;
  private userId: number;
  private roles: any;
  private title: string = 'Nuevo Usuario';
  private breadcrumbs = [
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
      title: 'Usuarios',
      link: '/client/security/users',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/security/users/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.compose([Validators.required, ValidationService.emailValidator])]],
      role: ['', [Validators.required]],
      active: [true],
    });
  }

  ngOnInit() {
    this.apiService.all('client/role').subscribe((roles) => {
      this.roles = roles.data
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Usuario';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/security/users/' + params['id'];
        this.userId = params['id'];
        this.apiService.one('client/secure-user', params['id'], 'role').subscribe((user) => {
          user.data.role = user.data.role.id;
          this.initForm(user.data)
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
      this.apiService.update('client/secure-user', this.userId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Usuario actualizado con exito');
          this.router.navigate(['/client/security/users'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/secure-user', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Usuario creado con exito');
          this.router.navigate(['/client/security/users'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/security/users'])
  }
}
