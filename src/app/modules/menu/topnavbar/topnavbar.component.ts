import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {User} from "../../auth/types/User";
import {AuthService} from "../../auth/services/auth.service";
import {UserService} from "../../auth/services/user.service";
import {EventsService} from "../../../services/events/events.service";
import {NotificationsService} from "../../../services/notifications/notifications.service";

@Component({
  selector: 'topnav-bar',
  providers: [],
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.scss'],
})
export class TopNavBarComponent implements OnInit {
  public user: User;
  @Input() public userMenu;
  public profilePicture: string;
  public notifications: any[] = [];
  public unreadCount = 0;
  public notificationUrl = '/client/my-notifications';

  constructor(private authService: AuthService, private router: Router, private eventService: EventsService,
              private toastr: ToastsManager, private userService: UserService, private notificationService: NotificationsService) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
        if (this.user.isSuperUser) {
          this.notificationUrl = '/admin/console/my-notifications'
        }
        this.profilePicture = this.user.thumb ? this.user.thumb : 'assets/img/missing.png'
      },
      error => console.log(error));
    this.reloadNotifications();
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

  ngAfterViewInit() {

  }

  logout() {
    this.authService.logout().subscribe((data) => {
      this.router.navigate(['/login']);
      this.toastr.success('Sesión Cerrada')
    }, (error) => console.log(error))
  }

  reloadNotifications() {
    this.notificationService.getLatest(true).subscribe(
      (notifications) => {
        this.notifications = notifications.data;
        this.unreadCount = notifications.meta.unreadCount;
      },
      error => console.log(error));

    return false;
  }
}

