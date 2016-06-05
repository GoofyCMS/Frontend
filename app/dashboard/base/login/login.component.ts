import {Component} from "@angular/core";
import {InputText, Password, Button, Message, Growl} from "primeng/primeng";
import {AuthService} from "./auth.service";


@Component({
    selector: "login-form",
    directives: [InputText, Password, Button, Growl],
    templateUrl: "./app/dashboard/base/login/login.component.html",
    styleUrls: ["./app/dashboard/base/login/login.component.css"],
    providers: [AuthService],
})
export class LoginComponent {
    messages: Message[] = [];

    constructor(public authService: AuthService) {
        this.messages = [];
    }

    addMessage(messages: Message[], severity: string, summary: string, detail: string, timer: number = 2500): void {
        messages.push({severity: severity, summary: summary, detail: detail});

        setTimeout(function () {
            this.messages = [];
        }.bind(this), timer);
    }

    login(username: string, password: string): boolean {
        this.messages = [];
        if (!this.authService.login(username, password)) {
            this.addMessage(this.messages, "error", "Login Failed", "Invalid Credentials");
        } else {
            this.addMessage(this.messages, "info", "Login Succesful", "Welcome to Goofy!!");
        }
        return false;
    }

    logout(): boolean {
        this.authService.logout();
        return false;
    }
}


