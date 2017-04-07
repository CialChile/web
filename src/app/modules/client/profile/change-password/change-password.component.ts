import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {ValidationService} from "../../../../components/forms/validation/validation.service";

@Component({
  selector: 'client-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: any;
  public user: any;
  public saving: boolean;
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
