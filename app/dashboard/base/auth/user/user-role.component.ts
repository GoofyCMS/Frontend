import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {UserRoleService} from "./user-role.service";

@Component({
    selector: "user-roles",
    templateUrl: "./app/dashboard/auth/user/user-role.component.html",
    providers: [UserRoleService],
})
export class UserRoleComponent implements OnInit {
    public _elems: any[];

    constructor(private _userRoleService: UserRoleService) {
    }

    public getUserRoles(): void {
        this._elems= [];
        this._userRoleService.getUserRoles()
            .then(
                s=> {
                    this._elems= s.results;
                }
            );
    }

    ngOnInit(): void {
        this.getUserRoles();
    }
}
