"use strict";
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {GoofyDashboardComponent} from './components/goofy-dashboard/goofy.dashboard.component';
import {ServersComponent} from './components/server/servers.component';
import {UsersComponent} from './components/user/users.component';

@Component({
    selector: 'goofy-app',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['app/goofy.app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/dashboard/...', as: 'GoofyDashboard', component: GoofyDashboardComponent, useAsDefault: true},
])

export class GoofyAppComponent {
    constructor() {
    }
}