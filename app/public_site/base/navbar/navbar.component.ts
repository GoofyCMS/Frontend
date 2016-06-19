import {Component, OnInit} from "@angular/core";
import {Menu} from "primeng/primeng";
import {RouterLink} from "@angular/router-deprecated";


@Component({
    selector: "navbar",
    templateUrl: "./app/public_site/base/navbar/navbar.component.html",
    styleUrls: ["./app/public_site/base/navbar/navbar.component.css"],
    directives: [Menu, RouterLink],
})
export class NavbarComponent {


}