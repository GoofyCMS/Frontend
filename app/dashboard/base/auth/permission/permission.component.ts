import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {PermissionService} from "./permission.service";
import {InputSwitch} from "primeng/primeng";

@Component({
    selector: "permissions",
    templateUrl: "./app/dashboard/auth/permission/permission.component.html",
    directives: [InputSwitch],
    providers: [PermissionService],
})
export class PermissionComponent implements OnInit {
    public _elems: any[];

    constructor(private _permissionService: PermissionService) {
    }

    public getPermissions(): void {
        this._elems= [];
        this._permissionService.getPermissions()
            .then(
                s=> {
                    this._elems= s.results;
                }
            );
    }

    ngOnInit(): void {
        this.getPermissions();
    }
}
