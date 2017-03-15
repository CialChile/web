import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {UserService} from "../../../auth/services/user.service";

@Component({
  selector: 'client-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  private profileForm: any;
  private loading: boolean;
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
      active: true
    }
  ];
  constructor(private formBuilder: FormBuilder, private userService: UserService,
              public toastr: ToastsManager, private apiService: ApiService) {
    this.profileForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [{value: '', disabled: true}, Validators.compose([Validators.required, ValidationService.emailValidator])],
    });
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        this.loading = false;
        this.initForm(user)
      },
      error => console.log(error));
  }

  initForm(user) {
    this.user = user;
    this.profileForm.reset(user)

  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    this.saving = true;
    let data = this.profileForm.value;
    this.apiService.update('client/user', this.user.id, data).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Perfil actualizado con exito');
        this.userService.getUser(true).subscribe(
          (user) => {
            this.loading = false;
          },
          error => console.log(error));
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      });
  }


}
