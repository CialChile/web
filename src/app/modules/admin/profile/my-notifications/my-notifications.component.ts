import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "../../../../services/notifications/notifications.service";

@Component({
  selector: 'app-admin-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.scss']
})
export class MyNotificationsComponent implements OnInit {

  breadcrumbs = [
    {
      title: 'Home',
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Mis Notificaciones',
      link: '/admin/console/my-notifications',
      active: true
    }
  ];

  loading: boolean = false;
  public notifications: any = [];
  public hasMorePages: boolean = true;

  constructor(private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    const notificationsLength = this.notifications.length;
    let page = !notificationsLength ? 1 : notificationsLength / 10 + 1;
    if (this.hasMorePages) {
      this.notificationService.paginate(page).subscribe(
        (notifications) => {
          this.loading = false;
          this.notifications = [...this.notifications, ...notifications.data];
          this.hasMorePages = notifications.meta.hasMorePages;
        },
        error => console.log(error));
    }
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead().subscribe((response) => {
      this.notifications.forEach((notification, index) => {
        this.notifications[index].read = true;
      })
    })
  }

}
