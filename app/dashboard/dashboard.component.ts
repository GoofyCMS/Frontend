import {Component, Inject, Input, OnInit} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink} from "@angular/router-deprecated";
import {MainContentComponent} from "./base/mainContent/mainContent";
import {ArticleListComponent} from "./plugins/blog/articles-list.component";
import {LoginComponent} from "./base/auth/login/login.component";
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
import {AuthService} from "../shared/services/auth.service";
import {PluginsService} from "./plugins/plugin.service";


@Component({
    selector: "goofy-dashboard",
    styleUrls: ["./app/dashboard/dashboard.component.css"],
    templateUrl: "./app/dashboard/dashboard.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, MenuComponent, Sidebar],
    providers: [PluginsService]
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
    {path: "/auth-role-claims", as: "AuthRoleClaims", component: RoleClaimComponent},
    {path: "/**", redirectTo: ["Login"]},
])
export class GoofyDashboardComponent implements OnInit {
    public toggle: boolean = true;
    private _plugins: any[];

    constructor(@Inject('AuthServiceProvider') public _authService: AuthService,
                private _pluginsService: PluginsService) {

    }

    public getPlugins(): void {
        this._plugins = this._pluginsService.pluginsList;
        // this._pluginsService.getPlugins()
        //     .then(
        //         res=> this._plugins = res.results
        //     );
    }

    ngOnInit(): void {
        this.getPlugins();
    }

}
