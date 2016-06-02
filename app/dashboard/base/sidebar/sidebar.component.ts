import {Component} from "@angular/core";
import {RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";


@Component({
    selector: "sidebar",
    styleUrls: ["./app/dashboard/base/sidebar/sidebar.component.css"],
    templateUrl: "./app/dashboard/base/sidebar/sidebar.component.html",
    directives: [ROUTER_DIRECTIVES, RouterLink],
})
export class Sidebar {
    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    toggleMenu(e: any): void {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }

    constructor() {
    }
}
