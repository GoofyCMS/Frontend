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


import {Button} from "primeng/primeng";
import {ArticleService} from "../../../dashboard/plugins/blog/article.service";


@Component({
    selector: "breezetest",
    templateUrl: "./app/public_site/base/home/breezetest.html",
    directives: [FormlyForm, Button],
    providers: [FormlyConfig, FormlyMessages, ArticleService]
})
export class BreezeTest {
    public article;
    public articleFields;
    form;
    Stream;
    article: any = {};
    private articleFields: Array < FormlyFieldConfig > = [];

    constructor(fm: FormlyMessages, fc: FormlyConfig, protected fb: FormBuilder, private _articleService: ArticleService) {
        // setTimeout(()=> {
        //     this._articleService.getItems();
        // });

        this.article = this._articleService._datasource.items[0];

        if (!this.form) {
            this.form = this.fb.group({});
        }

        if (!this.form) {
            this.form = this.fb.group({});
        }
        fm.addStringMessage("required", "This field is required.");
        fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        fm.addStringMessage("minlength", "Should have atleast 2 Characters");

        ["input"].forEach(function (field) {
            fc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });

        this.Stream = new FormlyEventEmitter();

        setTimeout(() => {
                this.articleFields = [
                    {
                        type: "input",
                        key: "content",
                        templateOptions: {
                            type: "text",
                            label: "Content",
                            disabled: false,
                            placeholder: "content",
                            description: "Type your content here"
                        }
                    }
                ]
                ;

                this.article = {
                    content: "empty"
                };
                this.Stream.emit({
                    model: this.article,
                    fields: this.articleFields
                });
            }

            ,
            0
        );


    }

    console(data) {
        console.log(data);
    }

    resetForm() {
        this.article = {
            content: "empty"
        };
    }

    submit(user) {
        console.log(user);
    }
}
