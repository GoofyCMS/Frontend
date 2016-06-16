import {Component} from "@angular/core";
import {InputText, Password, Button, Message, Growl} from "primeng/primeng";
import {AuthService} from "./auth.service";
import {CookieService} from "angular2-cookie/core";


@Component({
    selector: "login-form",
    directives: [InputText, Button, Growl],
    templateUrl: "./app/dashboard/base/login/login.component.html",
    styleUrls: ["./app/dashboard/base/login/login.component.css"],
    providers: [AuthService, CookieService],
})
export class LoginComponent {
    messages: Message[] = [];

    constructor(public authService: AuthService) {
        this.messages = [];
    }


    login(username: string, password: string): void {
        this.authService.login(username, password, this.messages);

    }

    logout(): boolean {
        this.authService.logout(this.messages);
        return false;
    }
}


