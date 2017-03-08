import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {TopNavBarComponent} from "./topnavbar/topnavbar.component";
import {SidebarDropdownComponent} from "./sidebar/sidebar-dropdown/sidebar-dropdown.component";
import {SidebarItemComponent} from "./sidebar/sidebar-item/sidebar-item.component";
import {RouterModule} from "@angular/router";
import {DropdownModule} from "ng2-bootstrap";
import {FooterComponent} from "../../components/footer/footer.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        DropdownModule.forRoot()
    ],
    declarations: [SidebarComponent, TopNavBarComponent, FooterComponent,
        SidebarDropdownComponent, SidebarItemComponent],
    exports: [SidebarComponent, TopNavBarComponent, FooterComponent,
        SidebarDropdownComponent, SidebarItemComponent]
})
export class MenuModule {
}
