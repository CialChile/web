import {Component, OnInit} from '@angular/core';
import {User} from "../../auth/types/User";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ADMINMENUITEMS} from "../menu/AdminMenuItems";
import {Menu} from "../../menu/types/Menu";
import {UserService} from "../../auth/services/user.service";

@Component({
    selector: 'app-admin',
    templateUrl: './admin-index.component.html',
    styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {

    user: User;
    menu: Menu[] = ADMINMENUITEMS;

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
