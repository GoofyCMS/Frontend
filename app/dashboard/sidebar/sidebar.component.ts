import {Component} from "angular2/core";
import { RouterLink, ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    selector: "sidebar",
    styleUrls: ["./app/dashboard/sidebar/sidebar.component.css"],
    templateUrl: "./app/dashboard/sidebar/sidebar.component.html",
    directives: [ROUTER_DIRECTIVES, RouterLink],
})
export class Sidebar {
    private name: string;

    constructor() {
        this.name = "test";
    }
}
