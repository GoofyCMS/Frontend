import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UserService} from "./user.service";
import {IUser} from "./user";


@Component({
    selector: "users",
    templateUrl: "./app/dashboard/base/user/users.component.html",
    providers: [UserService],
})

export class UsersComponent implements OnInit {
    public users: IUser[];

    constructor(private _userService: UserService) {
    }

    getAuth(url: string, email: string, pw: string) {
        this._userService.getUserAuth(url, email, pw);
    }

    getUsers() {
        this.users = [];

        this._userService.getUsers()
            .subscribe(u => this.users.push(u));
    }

    ngOnInit() {
        this.getUsers();
    }
}