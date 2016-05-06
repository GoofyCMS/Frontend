"use strict";
import {Component, OnInit} from "angular2/core";
import {Router} from "angular2/router";
import {UserService} from "./user.service";
import {IUser} from "./user";


@Component({
    selector: "users",
    templateUrl: "./app/dashboard/user/users.component.html",
    providers: [UserService]
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