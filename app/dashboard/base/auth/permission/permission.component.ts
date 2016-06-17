import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {PermissionService} from "./permission.service";
import {InputSwitch} from "primeng/primeng";

@Component({
    selector: "permissions",
    templateUrl: "./app/dashboard/base/auth/permission/permission.component.html",
    directives: [InputSwitch],
    providers: [PermissionService],
})
export class PermissionComponent implements OnInit {
    public _elems: any[];

    constructor(private _permissionService: PermissionService) {
    }

    public Elems() {
        return this._permissionService._datasource.items;
    }

    public GetAll(): void {
        this._permissionService.GetAll();
    }

    ngOnInit(): void {
        this.GetAll();
    }
}
