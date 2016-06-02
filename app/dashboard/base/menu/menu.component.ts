import { Component } from "@angular/core";
import { Menubar } from "primeng/primeng";

@Component({
    selector: "menu",
    templateUrl: "./app/dashboard/base/menu/menu.component.html",
    styleUrls: ["./app/dashboard/base/menu/menu.component.css"],
    directives: [Menubar],
})
export class MenuComponent {

}