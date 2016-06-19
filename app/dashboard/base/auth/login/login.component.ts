import {Component, Inject} from "@angular/core";
import {InputText, Password, Button, Message, Growl} from "primeng/primeng";
import {AuthService} from "./../../../../shared/services/auth.service";


@Component({
    selector: "login-form",
    directives: [InputText, Button, Growl],
    templateUrl: "./app/dashboard/base/auth/login/login.component.html",
    styleUrls: ["./app/dashboard/base/auth/login/login.component.css"],
    providers: [AuthService],
})
export class LoginComponent {
    messages: Message[] = [];
    user: string;

    constructor(@Inject('AuthServiceProvider') private authService: AuthService) {
        this.messages = [];
        this.user = authService.CurrentUser;
    }

    login(username: string, password: string): void {
        this.authService.login(username, password, this.messages);
    }

    logout(): boolean {
        this.authService.logout(this.messages);
        return false;
    }
}


