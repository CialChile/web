import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {User} from "../../auth/types/User";
import {AuthService} from "../../auth/services/auth.service";
import {UserService} from "../../auth/services/user.service";
import {EventsService} from "../../../services/events/events.service";

@Component({
  selector: 'topnav-bar',
  providers: [],
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss'],
})
export class TopNavBarComponent {
  private user: User;
  @Input() userMenu;
  private profilePicture: string;

  constructor(private authService: AuthService, private router: Router, private eventService: EventsService,
              private toastr: ToastsManager, private userService: UserService) {

  }

  toggleClicked(event: MouseEvent) {
    const body = document.getElementsByTagName('body')[0];
    this.eventService.broadcast('menu-toggle');
    if (body.classList) {
      body.classList.toggle('nav-md');
      body.classList.toggle('nav-sm');
    } else {
      const classes = body.className.split(' ');
      let existingIndex = classes.indexOf('nav-md');

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push('nav-md');
      existingIndex = classes.indexOf('nav-sm');

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push('nav-sm');

      body.className = classes.join(' ');
    }
  }


  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
        this.profilePicture = this.user.thumb ? this.user.thumb : 'assets/img/missing.png'
      },
      error => console.log(error));
  }

  ngAfterViewInit() {

  }

  logout() {
    this.authService.logout().subscribe((data) => {
      this.router.navigate(['/login'])
      this.toastr.success('Sesión Cerrada')
    }, (error) => console.log(error))
  }
}

