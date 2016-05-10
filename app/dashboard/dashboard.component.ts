import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {RouteConfig, RouterLink} from "@angular/router-deprecated";
import {MainContentComponent} from "./mainContent/mainContent";
import {UsersComponent} from "./user/users.component";
import {ServersComponent} from "./server/servers.component";
import {LoginForm} from "./login/login-form.component";
// import {LogService} from "angular2-log/log";
import { MenuComponent } from "./menu/menu.component";
import { Sidebar } from "./sidebar/sidebar.component";


@Component({
    selector: "goofy-dashboard",
    styleUrls: ["./app/dashboard/dashboard.component.css"],
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, MenuComponent, Sidebar],
    providers: [LoginForm],
})
@RouteConfig([
    { path: "/login", as: "Login", component: LoginForm },
    { path: "/main", as: "Main", component: MainContentComponent, useAsDefault: true },
    { path: "/servers", as: "Servers", component: ServersComponent },
    { path: "/users", as: "Users", component: UsersComponent },
    { path: "/**", redirectTo: ["Login"] },
])

export class GoofyDashboardComponent {
    public toggle: boolean = true;
    public mobileView: number = 992;
    public currentUser: string = "Carola";
    public _isLogin: boolean = false;

    constructor() {

    }

    private ngOnInit(): void {
      
    }

    public isLogin(): string {
        if (localStorage.getItem("currentUser")) {
            this.currentUser = localStorage.getItem("currentUser");
            this._isLogin = true;
        } else {
            this._isLogin = false;
        }
        return localStorage.getItem("currentUser");
    }


}
