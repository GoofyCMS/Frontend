import { Component, ElementRef } from "@angular/core";
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from "@angular/common";
import { CustomValidators } from "./custom.validators";

// import {IUser} from "../user/user";
import {UserService} from "../user/user.service";

declare var document: any;
declare var window: any;

/*
 @component: login-form
 @descrip: Component for implement login form using ajax and validators
 */
@Component({
    selector: "login-form",
    providers: [UserService],
    templateUrl: "./app/dashboard/login/login-form.component.html",
    styleUrls: ["./app/dashboard/login/login-form.component.css"],
    directives: [FORM_DIRECTIVES],
})
export class LoginForm {
    // Properties
    private myForm: ControlGroup;
    private username: AbstractControl;
    private email: AbstractControl;
    private password: AbstractControl;
    private typeUsernameOrEmailAttr: string;
    private usernameAttr: string;
    private emailAttr: string;
    private passwordAttr: string;
    private sendAttr: string;
    private urlAttr: string;
    private frameworkCssAttr: string;
    private inputsClass: string;
    private btnClass: string;
    private alertClass: string;
    private loginOK: boolean;
    private currentUser: string;

    constructor(fb: FormBuilder, private element: ElementRef, private _userService: UserService) {
        // Get attributes values
        let tag = this.element.nativeElement;
        // this.typeUsernameOrEmailAttr = typeof tag.getAttribute('type_username_or_email') !== 'undefined' ? tag.getAttribute('type_username_or_email') : "email";
        this.typeUsernameOrEmailAttr = "email";
        // this.usernameAttr = typeof tag.getAttribute('username') !== 'undefined' ? tag.getAttribute('username') : "Username";
        this.usernameAttr = "Username";
        // this.passwordAttr = typeof tag.getAttribute('password') !== 'undefined' ? tag.getAttribute('password') : "Password";
        this.passwordAttr = "Password";
        // this.emailAttr = typeof tag.getAttribute('email') !== 'undefined' ? tag.getAttribute('email') : "Email";
        this.emailAttr = "Email";
        // this.sendAttr = typeof tag.getAttribute('send') !== 'undefined' ? tag.getAttribute('send') : "Send";
        this.sendAttr = "Send";
        // this.urlAttr = typeof tag.getAttribute('url') !== 'undefined' ? tag.getAttribute('url') : "/send/";
        this.urlAttr = "http://192.168.249.50:5000/auth/";
        // this.frameworkCssAttr = typeof tag.getAttribute('frameworkCss') !== 'undefined' ? tag.getAttribute('frameworkCss') : "bootstrap";
        this.frameworkCssAttr = "bootstrap";

        this.inputsClass = "form-control";
        this.btnClass = "btn btn-default";
        this.alertClass = "alert alert-info";

        // Validators form
        if (this.typeUsernameOrEmailAttr.trim() === "email") {
            this.myForm = fb.group({
                "email": ["", Validators.compose([Validators.required, CustomValidators.validateEmail])],
                "password": ["", Validators.required],
            });

            this.email = this.myForm.controls["email"];
            this.password = this.myForm.controls["password"];
        } else {
            this.myForm = fb.group({
                "username": ["", Validators.required],
                "password": ["", Validators.required],
            });

            this.username = this.myForm.controls["username"];
            this.password = this.myForm.controls["password"];
        }

        this.loginOK = false;
    }

    public checkUser(email: string, pass: string): boolean {
        this.loginOK = this._userService.checkUser(email, pass);

        return this.loginOK;
    }

    public isLogin(): boolean {
        return this.loginOK;
    }

    public getCurrentUser(): string {
        if (this.loginOK) {
            return this.currentUser;
        } else {
            return "NO";
        }
    }

    /*
     @method: sendLogin
     @descrip: Event submit for form login
     */
    public sendLogin(value: any): void {
        // Result to send email
        let result: any = document.querySelector("#result");
        let result_card: any = document.querySelector("#result_card");
        let progress: any = document.querySelector("#progress");

        // Hide elements
        result_card.style.display = "none";
        // Show progress
        progress.removeAttribute("style");

        // Parameters
        let creds: string = "email=" + value.email + "&password=" + value.password;

        let foo: boolean = this.checkUser(value.email, value.password);

        if (foo) {
            console.log("login ok");
            result.innerHTML = "Login ok";
            // Show card message and hide progress
            result_card.style.display = "block";
            progress.style.display = "none";

            localStorage.setItem("currentUser", value.email);
        } else {
            result.innerHTML = "Login NOT ok";
            // Show card message and hide progress
            result_card.style.display = "block";
            progress.style.display = "none";
            if (localStorage.getItem("currentUser")) {
                localStorage.removeItem("currentUser");
            }
        }

        this._userService.getUserAuth("http://192.168.249.50:5000/auth/register", value.email, value.password);

        //// Send email
        // window.fetch(this.urlAttr, {
        //        method: 'POST',
        //        credentials: 'include',
        //        headers: {
        //            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //        },
        //        body: creds
        //    })
        //    .then((data) => {
        //        let res = data.text();
        //        res.then((message) => {
        //            //Check login redirect
        //            if (data.ok && data.status == 200) {
        //                window.location = data.url;
        //            } else {
        //                result.innerHTML = message;
        //                //Show card message and hide progress
        //                result_card.style.display = "block";
        //                progress.style.display = "none";
        //            }
        //        });
        //    })
        //    .catch((error) => {
        //        console.log(error);
        //        result.innerHTML = "Error al procesar el formulario";
        //        //Show card message and hide progress
        //        result_card.style.display = "block";
        //        progress.style.display = "none";
        //    });
    }
}
