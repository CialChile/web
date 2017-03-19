import {Component} from "@angular/core";
import {Credentials} from "../types/Credentials";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {UserService} from "../services/user.service";
import {User} from "../types/User";
import {FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../components/forms/validation/validation.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: Credentials = {
    email: null,
    password: null
  };
  private user: User;
  private loginForm: any;
  private loginIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, public toastr: ToastsManager,
              private userService: UserService, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      'password': ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.loginIn = true;
      this.authService.login(this.credentials).subscribe(
        (token) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', token);
          localStorage.removeItem('permissions');
          this.userService.getUserLogin().subscribe(
            (user) => {
              localStorage.setItem('permissions', JSON.stringify(user.permissions));
              this.toastr.success('Inicio de sesión exitoso');
              this.user = user;
              if (this.user['isSuperUser']) {
                this.router.navigate(['/admin/dashboard']);
              } else {
                this.router.navigate(['/client/dashboard']);
              }
            },
            error => this.loginIn = false
          )
        },
        (error) => {
          this.toastr.error(error);
          this.loginIn = false
        })
    }
  }


  ngOnDestroy() {

  }

}
