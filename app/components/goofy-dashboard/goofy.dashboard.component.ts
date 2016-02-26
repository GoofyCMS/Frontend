"use strict";
import {Component, provide} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {APP_BASE_HREF,RouteConfig, RouterLink, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap}  from 'angular2/platform/browser';
import {MainContentComponent} from './mainContent/mainContent';
import {UsersComponent} from "../user/users.component";
import {ServersComponent} from "../server/servers.component";
import {LoginForm} from "./login-form.component";


@Component({
    selector: 'goofy-dashboard',
    templateUrl: 'app/components/goofy-dashboard/goofy.dashboard.component.html',
    styleUrls: ['app/components/goofy-dashboard/goofy.dashboard.component.css'],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink],
    providers: [LoginForm]
})
@RouteConfig([
    {path: '/login', as: 'Login', component: LoginForm, useAsDefault: true},
    {path: '/main', as: 'Main', component: MainContentComponent,},
    {path: '/servers', as: 'Servers', component: ServersComponent},
    {path: '/users', as: 'Users', component: UsersComponent},
    {path: '/**', redirectTo: ['Login']}
])

export class GoofyDashboardComponent {
    public toggle:boolean = true;
    public mobileView:number = 992;
    public currentUser = 'Carola';
    public _isLogin = false;

    constructor() {
    }

    ngOnInit() {
        this.mobileView = 992;
        this.attachEvents();
    }

    public isLogin() {
        if (localStorage.getItem('currentUser')) {
            this.currentUser = localStorage.getItem('currentUser');
            this._isLogin = true;
        }
        else {
            this._isLogin = false;
        }
        return localStorage.getItem('currentUser');
    }

    attachEvents() {
        window.onresize = ()=> {
            if (GoofyDashboardComponent.getWidth() < this.mobileView) {
                //if (localStorage.getItem('toggle')) {
                //    //this.toggle = !localStorage.getItem('toggle') ? false : true;
                //    this.toggle = localStorage.getItem('toggle');
                //} else {
                console.log('deberia cerrar');
                this.toggleSidebar();
                //}
            } else {
                console.log('deberia abrir');
                this.toggleSidebar();
            }
        }
    }

    static getWidth() {
        return window.innerWidth;
    }

    toggleSidebar() {
        this.toggle = !this.toggle;
        localStorage.setItem('toggle', this.toggle.toString());
    }

}
