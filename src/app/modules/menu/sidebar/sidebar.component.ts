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

    anchorClicked(event: MouseEvent) {
        var targetId = event.srcElement.id;
        var target = event.srcElement;
        if (!targetId && event.srcElement.classList.contains('fa')) {
            target = event.srcElement.parentElement;
        }
        if (target.parentElement.classList.contains('active')) {
            var dropdown = target.parentElement.querySelector('ul');
            SidebarComponent.slideUp(dropdown);
            target.parentElement.classList.remove('active');
            target.parentElement.classList.remove('active-sm');
        } else {
            if (!target.parentElement.classList.contains('child_menu')) {
                for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li')) {
                    menu.classList.remove('active');
                    menu.classList.remove('active-sm');
                }
                for (let menu of <HTMLLIElement[]><any>document.getElementById('sidebar-menu').querySelectorAll('li > ul')) {
                    SidebarComponent.slideUp(menu)
                }
            }
            target.parentElement.classList.add('active');
            var dropdown = target.parentElement.querySelector('ul');
            SidebarComponent.slideDown(dropdown);
        }
    }

    static slideDown(elem) {
        elem.style.maxHeight = '1000px';
        //   elem.style.opacity = '1';
    }

    static slideUp(elem) {
        elem.style.maxHeight = '0';
        // elem.style.opacity = '0';
    }

    ngOnInit() {
        this.userService.getUser().subscribe(
            (user) => {
                this.user = user;
            },
            error => console.log(error));
    }
}
