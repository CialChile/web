import {Component, OnInit} from '@angular/core';
import {CLIENTMENUITEMS} from "../menu/ClientMenuItems";
import {Menu} from "../../menu/types/Menu";
import {UserService} from "../../auth/services/user.service";
import {User} from "../../auth/types/User";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: User;
    permission: string = 'permiso';
    menu: Menu[] = CLIENTMENUITEMS;

    constructor(private userService: UserService) {

    }


    ngOnInit() {
        this.userService.getUser().subscribe(
            (user) => {
                this.user = user;
            },
            error => console.log(error));
    }
}
