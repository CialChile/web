import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {ValidationService} from "../../../../components/forms/validation/validation.service";

@Component({
  selector: 'admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {
  private changePasswordForm: any;
  private user: any;
  private saving: boolean;
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Mi Perfil',
      link: '/client/my-profile',
      active: false
    },
    {
      title: 'Cambiar Contraseña',
      link: '/client/my-profile/change-password',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder,
              public toastr: ToastsManager, private apiService: ApiService) {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      new_password_confirmation: ['', [Validators.required]],
    });
  }

  ngOnInit() {

  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    this.saving = true;
    let data = this.changePasswordForm.value;
    this.apiService.create('client/user/change-password', data).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Contraseña Actualizada');
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      });
  }

}
