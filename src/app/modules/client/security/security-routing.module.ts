import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from "./security-routes"

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SecurityRoutingModule {
}
