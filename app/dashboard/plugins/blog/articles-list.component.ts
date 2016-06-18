import {Component, OnInit} from "@angular/core";
import {ArticleService} from "./article.service";
import {Dialog, Button} from "primeng/primeng";
import {DataTableWrapper} from "../../../shared/resources/datatable";

// for autorforms
import {Validators, FormBuilder} from "@angular/common";
import {FormlyForm} from "./../../../shared/auto-forms/components/formly.form";
import {ValidationService} from "./validation.service";
import {FormlyProviders} from "./../../../shared/auto-forms/services/formly.providers";
import {FormlyMessages} from "./../../../shared/auto-forms/services/formly.messages";
import {FormlyEventEmitter} from "./../../../shared/auto-forms/services/formly.event.emitter";
import {FormlyConfig} from "./../../../shared/auto-forms/services/formly.config";
import {TemplateDirectives} from "./../../../shared/auto-forms/templates/templates";
import {FormlyBootstrap} from "./../../../shared/auto-forms/templates/formlyBootstrap";
import {Field} from "./../../../shared/auto-forms/templates/field";
import {FormlyPubSub} from "./../../../shared/auto-forms/services/formly.event.emitter";
import {FormlyFieldConfig} from "./../../../shared/auto-forms/components/formly.field.config";

@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [FormlyForm, Button, Dialog],
    providers: [ArticleService, FormlyConfig, FormlyMessages, ArticleService],
})

export class ArticleListComponent implements OnInit {

    // items fields
    private articleFields: Array < FormlyFieldConfig > = [];
    private selectedItem: any = null;
    private newModel: any = {content: ''};

    //form groups for create forms
    addForm;
    editForm;
    Stream;

    // bindings for dialogs
    displayAddDialog: boolean = false;
    displayEditDialog: boolean = false;

    constructor(private _articleService: ArticleService,
                private fm: FormlyMessages,
                private fc: FormlyConfig,
                protected fb: FormBuilder) {
    }

    public getItems(): void {
        this._articleService.getItems()
    }

    public elems() {
        return this._articleService.items;
    }

    public changeInput(e, item) {
        this.selectedItem = item;
    }

    public addItem() {
        this._articleService.addItem(this.newModel);
        this.displayAddDialog = false;
    }

    public editItem() {
        this.displayEditDialog = false;
    }

    public removeItem() {
        this._articleService.removeItem(this.selectedItem);
    }

    public saveChanges() {
        this._articleService.saveChanges();
    }

    public showEditDialog() {
        if (this.selectedItem != null) {
            this.createForm(this.fm, this.fc, this.editForm);
            this.displayEditDialog = true;
        }
        else {
            console.log('nothing selected');
        }
    }

    public showAddDialog() {
        this.createForm(this.fm, this.fc, this.addForm);
        this.displayAddDialog = true;
    }

    ngOnInit(): void {
      
    }

    resetModel() {
        this.newModel = {content: ""}
    }

    public createForm(fm: FormlyMessages, fc: FormlyConfig, form) {
        if (!form) {
            form = this.fb.group({});
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

                this.Stream.emit({
                    model: this.selectedItem,
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
    }

    submit(user) {
        console.log(user);
    }
}
