import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {GoofyDashboardComponent} from "./dashboard/dashboard.component";
import {PublicSiteComponent} from "./public_site/public_site.component";

@Component({
    selector: "goofy-app",
    templateUrl: "./app/goofy.app.component.html",
    styleUrls: ["./app/goofy.app.component.css"],
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    { path: "/...", as: "GoofyPublicSite", component: PublicSiteComponent, useAsDefault: true },
    { path: "/dashboard/...", as: "GoofyDashboard", component: GoofyDashboardComponent},
])
export class GoofyAppComponent {
    constructor() {
    }
}
