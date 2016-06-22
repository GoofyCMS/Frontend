import {Component} from "@angular/core";
import {Validators, FormBuilder} from "@angular/common";

import {FormlyForm} from "./../../../shared/auto-forms/components/formly.form";
import {ValidationService} from "../../../dashboard/plugins/blog/validation.service";
import {FormlyProviders} from "./../../../shared/auto-forms/services/formly.providers";
import {FormlyMessages} from "./../../../shared/auto-forms/services/formly.messages";
import {FormlyEventEmitter} from "./../../../shared/auto-forms/services/formly.event.emitter";
import {FormlyConfig} from "./../../../shared/auto-forms/services/formly.config";
import {TemplateDirectives} from "./../../../shared/auto-forms/templates/templates";
import {FormlyBootstrap} from "./../../../shared/auto-forms/templates/formlyBootstrap";
import {Field} from "./../../../shared/auto-forms/templates/field";
import {FormlyPubSub} from "./../../../shared/auto-forms/services/formly.event.emitter";
import {FormlyFieldConfig} from "./../../../shared/auto-forms/components/formly.field.config";


import {UnitOfWork} from "../../../shared/services/unitofwork";
import {Datasource} from "../../../shared/services/datasource";
import {Button} from "primeng/primeng";


@Component({
    selector: "form",
    templateUrl: "./app/public_site/base/forms/form.component.html",
    directives: [FormlyForm, Button],
    providers: [FormlyConfig, FormlyMessages]
})
export class FormComponent {
    form;
    Stream;
    author;
    env;
    _user;

    constructor(fm: FormlyMessages, fc: FormlyConfig, protected fb: FormBuilder) {

        if (!this.form) {
            this.form = this.fb.group({});
        }

        fm.addStringMessage("required", "This field is required.");
        fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        fm.addStringMessage("minlength", "Should have atleast 2 Characters");

        ["input", "checkbox", "radio", "select", "textarea", "multicheckbox", "toggle"].forEach(function (field) {
            fc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });

        this.Stream = new FormlyEventEmitter();

        setTimeout(() => {

                this.userFields = [
                    {
                        type: "select",
                        key: "title",
                        templateOptions: {
                            options: [{
                                value: "mr",
                                label: "Mr."
                            }, {
                                value: "mrs",
                                label: "Mrs."
                            }],
                            label: "Title",
                            description: "Select a title that suits your description"
                        }
                    },
                    {
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
                    },
                    {
                        key: "password",
                        type: "input",
                        templateOptions: {
                            type: "password",
                            label: "Password",
                            placeholder: "Password",
                            focus: true
                        },
                        validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
                    },
                    {
                        key: "gender",
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
                    },
                    {
                        className: "section-label",
                        template: "<hr/><div><strong>Address:</strong></div>"
                    },
                    {
                        className: "ui-grid-row",
                        fieldGroup: [{
                            className: "ui-grid-col-12",
                            type: "input",
                            key: "street",
                            templateOptions: {
                                label: "Street",
                                placeholder: "604 Causley Ave. ",
                                description: "Enter a valid US Address"
                            }
                        }, {
                            className: "ui-grid-col-12",
                            type: "input",
                            key: "city",
                            templateOptions: {
                                label: "City",
                                placeholder: "Arlington"
                            }
                        }, {
                            className: "ui-grid-col-12",
                            type: "input",
                            key: "zip",
                            templateOptions: {
                                type: "number",
                                label: "Zip",
                                placeholder: "76010"
                            }
                        }]
                    }
                    ,

                    {
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
                    },
                    {
                        key: "toggleVal",
                        type: "toggle",
                        templateOptions: {}
                    }
                ]
                ;

                this.user = {
                    email: "email@gmail.com",
                    gender: "male",
                    zip: 2,
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
            }

            ,
            0
        );
    }

    user: any = {};
    private userFields: Array < FormlyFieldConfig > = [];

    console(data) {
        console.log(data);
    }

    hide() {
        this.userFields[1].fieldGroup[0].hideExpression = !this.userFields[1].fieldGroup[0].hideExpression;
    }

    resetForm() {
        this.user = {
            email: "email@gmail.com",
            gender: "male",
            title: "Mr.",
            toggleVal: true,
            interest: {
                "movies": false,
                "sports": false,
                "others": true
            }
        };
    }

    submit(user) {
        console.log(user);
    }


}