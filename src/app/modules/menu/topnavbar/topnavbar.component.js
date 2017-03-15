"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TopNavBarComponent = (function () {
    function TopNavBarComponent(authService, router, toastr, userService, eventsService) {
        this.authService = authService;
        this.router = router;
        this.toastr = toastr;
        this.userService = userService;
        this.eventsService = eventsService;
    }
    TopNavBarComponent.prototype.toggleClicked = function (event) {
        this.eventsService.broadcast('menu-toggle');
        var target = event.srcElement.id;
        var body = document.getElementsByTagName('body')[0];
        var menu = document.getElementById('sidebar-menu');
        // toggle small or large menu
        if (body.classList.contains('nav-md')) {
            for (var _i = 0, _a = menu.querySelectorAll('li.active ul'); _i < _a.length; _i++) {
                var el = _a[_i];
                el.style.display = 'none';
            }
            for (var _b = 0, _c = menu.querySelectorAll('li.active'); _b < _c.length; _b++) {
                var el = _c[_b];
                el.classList.add('active-sm');
                el.classList.remove('active');
            }
        }
        else {
            for (var _d = 0, _e = menu.querySelectorAll('li.active-sm ul'); _d < _e.length; _d++) {
                var el = _e[_d];
                el.style.display = 'block';
            }
            for (var _f = 0, _g = menu.querySelectorAll('li.active-sm'); _f < _g.length; _f++) {
                var el = _g[_f];
                el.classList.add('active');
                el.classList.remove('active-sm');
            }
        }
        if (body.classList) {
            body.classList.toggle('nav-md');
            body.classList.toggle('nav-sm');
        }
        else {
            var classes = body.className.split(' ');
            var existingIndex = classes.indexOf('nav-md');
            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push('nav-md');
            existingIndex = classes.indexOf('nav-sm');
            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push('nav-sm');
            body.className = classes.join(' ');
        }
    };
    TopNavBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.user = user;
        }, function (error) { return console.log(error); });
    };
    TopNavBarComponent.prototype.ngAfterViewInit = function () {
    };
    TopNavBarComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout().subscribe(function (data) {
            _this.router.navigate(['/login']);
            _this.toastr.success('Sesión Cerrada');
        }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.Input()
    ], TopNavBarComponent.prototype, "userMenu", void 0);
    TopNavBarComponent = __decorate([
        core_1.Component({
            selector: 'topnav-bar',
            providers: [],
            templateUrl: './topnavbar.component.html',
            styleUrls: ['./topnavbar.component.scss'],
        })
    ], TopNavBarComponent);
    return TopNavBarComponent;
}());
exports.TopNavBarComponent = TopNavBarComponent;