import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {RoleService} from "./role.service";
import {InputSwitch} from "primeng/primeng";

@Component({
    selector: "roles",
    templateUrl: "./app/dashboard/base/auth/role/role.component.html",
    directives: [InputSwitch],
    providers: [RoleService],
})
export class RoleComponent implements OnInit {
    public _elems: any[];

    constructor(private _roleService: RoleService) {
    }

    public getRoles(): void {
        this._elems= [];
        this._roleService.getRoles()
            .then(
                s=> {
                    this._elems= s.results;
                }
            );
    }

    ngOnInit(): void {
        this.getRoles();
    }
}
