import {Component, OnInit} from '@angular/core';
import {User} from "../../auth/types/User";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {CLIENTSIDEBARMENUITEMS} from "../menu/ClientSidebarMenuItems";
import {CLIENTTOPBARMENUITEMS} from "../menu/ClientTopbarMenuItems";
import {Menu} from "../../menu/types/Menu";
import {UserService} from "../../auth/services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  user: User;
  menu: Menu[] = CLIENTSIDEBARMENUITEMS;
  topBarMenu: Menu[] = CLIENTTOPBARMENUITEMS;

  constructor(private userService: UserService, private router: Router, public toastr: ToastsManager) {

  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      error => console.log(error));
  }
}
