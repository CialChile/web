import {Component, ViewContainerRef} from '@angular/core';
import {environment} from '../environments/environment';
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = environment.baseUrl;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
}
