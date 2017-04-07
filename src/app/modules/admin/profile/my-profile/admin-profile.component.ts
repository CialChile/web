import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {UserService} from "../../../auth/services/user.service";
import {objectToFormData} from "../../../../utilities/form/objectToFormData";

@Component({
  selector: 'admin-profile',
  templateUrl: 'admin-profile.component.html',
  styleUrls: ['admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  public profileForm: any;
  public loading: boolean;
  public user: any;
  public saving: boolean;
  public image: any = {
    objectURL: '',
    notDefault: false,
    deleted: false
  };
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
        this.image = {
          notDefault: !!user.image,
          deleted: false,
          objectURL: user.image,
        };
      },
      error => console.log(error));
  }

  initForm(user) {
    this.user = user;
    this.profileForm.reset(user)

  }

  imageChange(image) {
    this.image = image;
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let formData = objectToFormData(this.profileForm.value);
    if (this.image instanceof File) {
      formData.append('image', this.image);
    } else if (this.image.deleted) {
      formData.append('removeImage', true);
    }
    this.saving = true;
    this.apiService.formDataUpdate('client/user', this.user.id, formData).subscribe((response) => {
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
