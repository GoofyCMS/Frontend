import {Component} from "@angular/core";
import {Validators} from "@angular/common";

import {AutoFormsFormComponent} from "./../../../shared/auto-forms/components/form.component";
import {ValidationService} from "./validation.service";
import {AutoFormsProviders} from "./../../../shared/auto-forms/services/providers.service";
import {AutoFormsMessages} from "./../../../shared/auto-forms/services/messages.service";
import {AutoFormsEventEmitter} from "./../../../shared/auto-forms/services/event-emitter.service";
import {AutoFormsConfig} from "./../../../shared/auto-forms/services/config.service";
import {TemplateDirectives} from "./../../../shared/auto-forms/templates/templates";
import {AutoFormsBootstrap} from "./../../../shared/auto-forms/templates/bootstrap";
import {Field} from "./../../../shared/auto-forms/templates/field";
import {AutoFormsSubject} from "./../../../shared/auto-forms/services/event-emitter.service";
import {AutoFormsFieldConfig} from "./../../../shared/auto-forms/components/field.config";


import {UnitOfWork} from "../../../shared/services/unitofwork";
import {Datasource} from "../../../shared/services/datasource";



@Component({
    selector: "home",
    templateUrl: "./app/public_site/base/home/home.component.html",
    providers: [AutoFormsConfig, AutoFormsMessages]
})
export class HomeComponent {
    form;
    Stream;
    author;
    env;
    _user;

    constructor(afm: AutoFormsMessages, afc: AutoFormsConfig) {

        afm.addStringMessage("required", "This field is required.");
        afm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        afm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        afm.addStringMessage("minlength", "Should have atleast 2 Characters");

        ["input", "checkbox", "radio", "select", "textarea", "multicheckbox"].forEach(function (field) {
            afc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });
        this.author = {
            name: "Mohammed Zama Khan",
            url: "https://www.github.com/mohammedzamakhan"
        };
        this.env = {
            angularVersion: "2.0.0-rc.1",
            formlyVersion: "2.0.0-beta.4"
        };
        afc.setType({
            name: "toggle",
            component: HomeComponent
        });

        this.Stream = new AutoFormsEventEmitter();

        setTimeout(() => {

            this.userFields = [{
                type: "radio",
                key: "title",
                templateOptions: {
                    options: [{
                        key: "mr",
                        value: "Mr."
                    }, {
                        key: "mrs",
                        value: "Mrs"
                    }],
                    label: "Title",
                    description: "Select a title that suits your description"
                }
            }, {
                className: "row",
                fieldGroup: [{
                    className: "col-xs-4",
                    key: "email",
                    type: "input",
                    templateOptions: {
                        type: "email",
                        label: "Email address",
                        placeholder: "Enter email",
                        disabled: true
                    },
                    validation: Validators.compose([Validators.required, ValidationService.emailValidator]),
                    expressionProperties: {
                        "templateOptions.disabled": "!model.password"
                    }
                }, {
                    className: "col-xs-4",
                    key: "password",
                    type: "input",
                    templateOptions: {
                        type: "password",
                        label: "Password",
                        placeholder: "Password",
                        focus: true
                    },
                    validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
                }, {
                    className: "col-xs-4",
                    key: "select",
                    type: "select",
                    templateOptions: {
                        options: [{
                            label: "Male",
                            value: "male"
                        }, {
                            label: "Female",
                            value: "female"
                        }],
                        label: "Gender",
                        placeholder: "Select Gender"
                    }
                }]
            }, {
                className: "section-label",
                template: "</hr /><div><strong>Address:</strong></div>"
            }, {
                className: "row",
                fieldGroup: [{
                    className: "col-xs-6",
                    type: "input",
                    key: "street",
                    templateOptions: {
                        label: "Street",
                        placeholder: "604 Causley Ave. ",
                        description: "Enter a valid US Address"
                    }
                }, {
                    className: "col-xs-3",
                    type: "input",
                    key: "city",
                    templateOptions: {
                        label: "City",
                        placeholder: "Arlington"
                    }
                }, {
                    className: "col-xs-3",
                    type: "input",
                    key: "zip",
                    templateOptions: {
                        type: "number",
                        label: "Zip",
                        placeholder: "76010"
                    }
                }]
            }, {
                key: "checked",
                type: "checkbox",
                templateOptions: {
                    label: "Check me out",
                    description: "If you want to check me out, check this box"
                }
            }, {
                type: "multicheckbox",
                key: "interest",
                templateOptions: {
                    options: [{
                        key: "sports",
                        value: "Sports"
                    }, {
                        key: "movies",
                        value: "Movies"
                    }, {
                        key: "others",
                        value: "Others"
                    }],
                    label: "Interest",
                    description: "Select areas which you are interested"
                }
            }, {
                key: "otherInterest",
                type: "textarea",
                hideExpression: "!model.interest.others",
                templateOptions: {
                    rows: 5,
                    cols: 20,
                    placeholder: "Type a paragraph about your interest...",
                    label: "Other Interest"
                }
            }, {
                key: "textAreaVal",
                type: "textarea",
                templateOptions: {
                    rows: 5,
                    cols: 20,
                    placeholder: "Type a paragraph...",
                    label: "Message",
                    description: "Please enter atleast 150 characters"
                }
            }, {
                key: "toggleVal",
                type: "toggle",
                templateOptions: {}
            }];

            this.user = {
                email: "email@gmail.com",
                checked: true,
                select: "male",
                title: "Mr.",
                toggleVal: true,
                interest: {
                    "movies": false,
                    "sports": false,
                    "others": true
                }
            };
            this.Stream.emit({
                model: this.user,
                fields: this.userFields
            });
        }, 0);
    }

    user: any = {};
    private userFields: Array<AutoFormsFieldConfig> = [];

    console(data) {
        console.log(data);
    }

    showEmail() {
        this._user = Object.assign({}, this.user);
        this._user.email = "mohammedzamakhan";
        this._user.checked = !this.user.checked;
        this.user = this._user;
        this.Stream.emit({
            model: this.user
        });
    }

    hide() {
        this.userFields[1].fieldGroup[0].hideExpression = !this.userFields[1].fieldGroup[0].hideExpression;
    }

    changeEmail() {
        this.Stream.emit({});
    }

    submit(user) {
        console.log(user);
    }
}
