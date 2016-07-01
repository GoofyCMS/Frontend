import {Component, OnInit, ElementRef, OnDestroy} from "@angular/core";
import {PickList, DomHandler, Button} from "primeng/primeng";


@Component({
    selector: "home",
    templateUrl: "./app/public_site/base/home/home.component.html",
    directives: [PickList],
    providers: []
})
export class HomeComponent implements OnInit {
    list1: any[];
    list2: any[];

    ngOnInit() {
        this.list1 = ["a", "b", "c"];
        this.list2 = [];

    }
    
    

}