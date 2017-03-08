import {Component, OnInit, Input} from '@angular/core';
import {MenuItem} from "../../types/MenuItem";

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

    @Input() item: MenuItem;

    constructor() {
    }

    ngOnInit() {
    }

}
