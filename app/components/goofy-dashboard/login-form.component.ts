"use strict";
import { Component, ElementRef } from 'angular2/core';
import { FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, AbstractControl } from 'angular2/common';
import { CustomValidators } from "./custom.validators";

import {IUser} from '../user/user';
import {UserService} from '../user/user.service'

declare var document;
declare var window;

/*
 @component: login-form
 @descrip: Component for implement login form using ajax and validators
 */
@Component({
    selector: 'login-form',
    styleUrls: ['app/components/goofy-dashboard/login-form.component.css'],
    templateUrl: 'app/components/goofy-dashboard/login-form.component.html',
    directives: [FORM_DIRECTIVES],
    providers: [UserService]

})
export class LoginForm {
    //Properties
    myForm:ControlGroup;
    username:AbstractControl;
    email:AbstractControl;
    password:AbstractControl;
    typeUsernameOrEmailAttr:string;
    usernameAttr:string;
    emailAttr:string;
    passwordAttr:string;
    sendAttr:string;
    urlAttr:string;
    frameworkCssAttr:string;
    inputsClass:string;
    btnClass:string;
    alertClass:string;
    users: IUser[];
    loginOK: boolean;
    currentUser:string;
    currentPassword:string;

    constructor(fb:FormBuilder, private element:ElementRef, private _userService:UserService) {
        //Get attributes values
        let tag = this.element.nativeElement;
        //this.typeUsernameOrEmailAttr = typeof tag.getAttribute('type_username_or_email') !== 'undefined' ? tag.getAttribute('type_username_or_email') : "email";
        this.typeUsernameOrEmailAttr = "email";
        //this.usernameAttr = typeof tag.getAttribute('username') !== 'undefined' ? tag.getAttribute('username') : "Username";
        this.usernameAttr = "Username";
        //this.passwordAttr = typeof tag.getAttribute('password') !== 'undefined' ? tag.getAttribute('password') : "Password";
        this.passwordAttr = "Password";
        //this.emailAttr = typeof tag.getAttribute('email') !== 'undefined' ? tag.getAttribute('email') : "Email";
        this.emailAttr = "Email";
        //this.sendAttr = typeof tag.getAttribute('send') !== 'undefined' ? tag.getAttribute('send') : "Send";
        this.sendAttr = "Send";
        //this.urlAttr = typeof tag.getAttribute('url') !== 'undefined' ? tag.getAttribute('url') : "/send/";
        this.urlAttr = "http://192.168.249.50:5000/auth/";
        //this.frameworkCssAttr = typeof tag.getAttribute('frameworkCss') !== 'undefined' ? tag.getAttribute('frameworkCss') : "bootstrap";
        this.frameworkCssAttr = "bootstrap";

        this.inputsClass = "form-control";
        this.btnClass = "btn btn-default";
        this.alertClass = "alert alert-info";

        //Validators form
        if (this.typeUsernameOrEmailAttr.trim() == "email") {
            this.myForm = fb.group({
                'email': ['', Validators.compose([Validators.required, CustomValidators.validateEmail])],
                'password': ['', Validators.required],
            });

            this.email = this.myForm.controls['email'];
            this.password = this.myForm.controls['password'];
        } else {
            this.myForm = fb.group({
                'username': ['', Validators.required],
                'password': ['', Validators.required],
            });

            this.username = this.myForm.controls['username'];
            this.password = this.myForm.controls['password'];
        }

        this.loginOK = false;
    }

    checkUser(email:string, pass: string):boolean {
        this.loginOK = this._userService.checkUser(email, pass);



        return this.loginOK;
    }


    public isLogin(){
        return this.loginOK;
    }

    public getCurrentUser(){
        if(this.loginOK){
            return this.currentUser;
        }
        else
            return "NO";
    }

    /*
     @method: sendLogin
     @descrip: Event submit for form login
     */
    sendLogin(value:any):void {
        //Result to send email
        let result = document.querySelector("#result");
        let result_card = document.querySelector("#result_card");
        let progress = document.querySelector("#progress");

        //Hide elements
        result_card.style.display = "none";
        //Show progress
        progress.removeAttribute("style");

        //Parameters
        let creds = "email=" + value.email + "&password=" + value.password;

        let foo: boolean = this.checkUser(value.email, value.password);

        if (foo){
            console.log('login ok');
            result.innerHTML = 'Login ok';
            //Show card message and hide progress
            result_card.style.display = "block";
            progress.style.display = "none";

            localStorage.setItem('currentUser', value.email);
        }
        else{
            result.innerHTML = 'Login NOT ok';
            //Show card message and hide progress
            result_card.style.display = "block";
            progress.style.display = "none";
            if(localStorage.getItem('currentUser')){
                localStorage.removeItem('currentUser');
            }
        }

        this._userService.getUserAuth('http://192.168.249.50:5000/auth/register', value.email, value.password);

        ////Send email
        //window.fetch(this.urlAttr, {
        //        method: 'POsT',
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
