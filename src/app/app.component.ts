import {Component, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {environment} from '../environments/environment';
import {ToastsManager} from "ng2-toastr";
import {Router, NavigationEnd, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = environment.baseUrl;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  private _routeScrollPositions: {[url: string]: number}[] = [];
  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    this._subscriptions.push(
      // save or restore scroll position on route change
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
        }
        if (currRouteEvent instanceof NavigationEnd) {
          window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
