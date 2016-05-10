import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {GoofyDashboardComponent} from "./dashboard/dashboard.component";
// import {LogService} from "angular2-log/log";


@Component({
    selector: "goofy-app",
    templateUrl: "./app/goofy.app.component.html",
    styleUrls: ["./app/goofy.app.component.css"],
    directives: [ROUTER_DIRECTIVES],
})
@RouteConfig([
    { path: "/dashboard/...", as: "GoofyDashboard", component: GoofyDashboardComponent, useAsDefault: true },
])

export class GoofyAppComponent {
    constructor() {
    }
}
