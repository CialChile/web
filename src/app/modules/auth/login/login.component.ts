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
            this.authService.login(this.credentials).subscribe(
                () => {
                    this.toastr.success('Inicio de sesión exitoso');
                    this.userService.getUser(true).subscribe(
                        (user) => {
                            this.user = user;
                            if (this.user['isSuperUser']) {
                                this.router.navigate(['/admin']);
                            } else {
                                this.router.navigate(['/dashboard']);
                            }
                        },
                        error => console.log(error));
                },
                (error) => {
                    this.toastr.error(error)
                })
        }
    }

}
