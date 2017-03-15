import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../auth/types/User";
import {UserService} from "../../auth/services/user.service";

@Component({
    selector: 'side-bar',  // <home></home>
    providers: [],
    // Our list of styles in our component. We may add more to compose many styles together
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
    private user: User;
    @Input() menu;

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
