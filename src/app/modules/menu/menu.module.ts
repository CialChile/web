import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {TopNavBarComponent} from "./topnavbar/topnavbar.component";
import {SidebarDropdownComponent} from "./sidebar/sidebar-dropdown/sidebar-dropdown.component";
import {SidebarItemComponent} from "./sidebar/sidebar-item/sidebar-item.component";
import {RouterModule} from "@angular/router";
import {DropdownModule} from "ng2-bootstrap";
import {FooterComponent} from "../../components/footer/footer.component";
import {TopbarDropdownItemComponent} from "./topnavbar/topbar-dropdown-item/topbar-dropdown-item.component";
import {UserCanModule} from "../../directives/user-can/user-can.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule.forRoot(),
    UserCanModule
  ],
  declarations: [SidebarComponent, TopNavBarComponent, FooterComponent,
    SidebarDropdownComponent, SidebarItemComponent, TopbarDropdownItemComponent],
  exports: [SidebarComponent, TopNavBarComponent, FooterComponent,
    SidebarDropdownComponent, SidebarItemComponent, TopbarDropdownItemComponent]
})
export class MenuModule {
}
