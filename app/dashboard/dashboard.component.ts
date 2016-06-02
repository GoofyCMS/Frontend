import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink} from "@angular/router-deprecated";
import {MainContentComponent} from "./base/mainContent/mainContent";
import {UsersComponent} from "./base/user/users.component";
import {ServersComponent} from "./server/servers.component";
import {LoginForm} from "./base/login/login-form.component";
import {LoginComponent} from "./base/login/login.component";
import {MenuComponent} from "./base/menu/menu.component";
import {Sidebar} from "./base/sidebar/sidebar.component";
import {PluginsComponent} from "./plugins/plugins.components";


@Component({
    selector: "goofy-dashboard",
    styleUrls: ["./app/dashboard/dashboard.component.css"],
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, MenuComponent, Sidebar],
    providers: [LoginForm],
})
@RouteConfig([
    {path: "/login", as: "Login", component: LoginComponent, useAsDefault: true},
    {path: "/main", as: "Main", component: MainContentComponent},
    {path: "/servers", as: "Servers", component: ServersComponent},
    {path: "/users", as: "Users", component: UsersComponent},
    {path: "/plugins", as: "Plugins", component: PluginsComponent},
    {path: "/**", redirectTo: ["Login"]},
])

export class GoofyDashboardComponent {
    public toggle: boolean = true;

    constructor() {

    }

}
