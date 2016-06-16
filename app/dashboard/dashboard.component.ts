import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink} from "@angular/router-deprecated";
import {MainContentComponent} from "./base/mainContent/mainContent";
import {UsersComponent} from "./base/user/users.component";
import {ArticleListComponent} from "./plugins/blog/articles-list.component";
import {LoginComponent} from "./base/login/login.component";
import {MenuComponent} from "./base/menu/menu.component";
import {Sidebar} from "./base/sidebar/sidebar.component";
import {PluginsComponent} from "./plugins/plugins.components";
import {
    PermissionComponent,
    RoleClaimComponent,
    RoleComponent,
    UserClaimComponent,
    UserRoleComponent,
    UserComponent
} from "./base/auth/auth";



@Component({
    selector: "goofy-dashboard",
    styleUrls: ["./app/dashboard/dashboard.component.css"],
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, MenuComponent, Sidebar],
})
@RouteConfig([
    {path: "/login", as: "Login", component: LoginComponent, useAsDefault: true},
    {path: "/main", as: "Main", component: MainContentComponent},
    {path: "/articles", as: "ArticlesList", component: ArticleListComponent},
    {path: "/plugins", as: "Plugins", component: PluginsComponent},
    {path: "/auth-user", as: "AuthUsers", component: UserComponent},
    {path: "/auth-roles", as: "AuthRoles", component: RoleComponent},
    {path: "/auth-permissions", as: "AuthPermissions", component: PermissionComponent},
    {path: "/auth-user-roles", as: "AuthUserRoles", component: UserRoleComponent},
    {path: "/auth-user-claims", as: "AuthUserClaims", component: UserClaimComponent},
    {path: "/auth-role-claims", as: "AuthRoleClaims", component: RoleClaimComponent },
    {path: "/**", redirectTo: ["Login"]},
])
export class GoofyDashboardComponent {
    public toggle: boolean = true;

    constructor() {

    }

}
