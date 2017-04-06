import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {TopNavBarComponent} from "./topnavbar/topnavbar.component";
import {SidebarDropdownComponent} from "./sidebar/sidebar-dropdown/sidebar-dropdown.component";
import {SidebarItemComponent} from "./sidebar/sidebar-item/sidebar-item.component";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "../../components/footer/footer.component";
import {TopbarDropdownItemComponent} from "./topnavbar/topbar-dropdown-item/topbar-dropdown-item.component";
import {UserCanModule} from "../../directives/user-can/user-can.module";
import {EventsService} from "../../services/events/events.service";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    UserCanModule
  ],
  declarations: [SidebarComponent, TopNavBarComponent, FooterComponent,
    SidebarDropdownComponent, SidebarItemComponent, TopbarDropdownItemComponent],
  providers: [EventsService],
  exports: [SidebarComponent, TopNavBarComponent, FooterComponent]
})
export class MenuModule {
}
