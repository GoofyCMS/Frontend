import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {UserService} from "./user.service";

@Component({
    selector: "users",
    templateUrl: "./app/dashboard/base/auth/user/user.component.html",
    providers: [UserService],
})
export class UserComponent implements OnInit {
    public _elems: any[];

    constructor(private _userService: UserService) {
    }

    public getUsers(): void {
        this._elems= [];
        this._userService.getUsers()
            .then(
                s=> {
                    this._elems= s.results;
                }
            );
    }

    ngOnInit(): void {
        this.getUsers();
    }
}
