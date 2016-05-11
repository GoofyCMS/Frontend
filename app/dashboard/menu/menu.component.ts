import { Component } from "@angular/core";
import { Menubar } from "primeng/primeng";

@Component({
    selector: "menu",
    templateUrl: "./app/dashboard/menu/menu.component.html",
    styleUrls: ["./app/dashboard/menu/menu.component.css"],
    directives: [Menubar],
})
export class MenuComponent {

}