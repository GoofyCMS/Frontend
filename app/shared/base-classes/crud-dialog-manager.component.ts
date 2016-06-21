//resource and services imports
import {DataSourceComponent} from "./datasource.component";
import {FormlyMessages} from "../auto-forms/services/formly.messages";
import {FormlyConfig} from "../auto-forms/services/formly.config";
import {FormBuilder} from "@angular/common";
import {FormlyFieldConfig} from "../auto-forms/components/formly.field.config";
import {FormlyEventEmitter} from "../auto-forms/services/formly.event.emitter";
import {TemplateDirectives} from "../auto-forms/templates/templates";
import {UnitOfWorkFactory} from "../services/unitofwork";
import {Logger} from "./../../shared/resources/logger";
import {Router} from "@angular/router-deprecated";
// import {ValidationService} from "./validation.service";

// automatic forms import

export class CrudDialogManagerComponent extends DataSourceComponent {
    // items fields
    private selectedItem: any = null;
    private newModel: any = {content: ''};
    private currentItem: any;

    //autoform vars


    //form groups for create forms
    form;
    Stream;

    tmpEntity: any = null;

    // dialog fields
    showDialog: boolean = false;
    dialogHeader: string = null;
    dialogOk: Function = null;
    dialogCancel = null;

    dialogContent: string = null;
    entityName: string = null;

    constructor(uowf: UnitOfWorkFactory,
                logger: Logger,
                router: Router,
                public contextName: string,
                public entityTypeName: string,
                public fm: FormlyMessages,
                public fc: FormlyConfig,
                public fb: FormBuilder,
                datasourceOptions?: any) {
        super(uowf,
            logger,
            router,
            contextName,
            entityTypeName,
            datasourceOptions == null ? null : datasourceOptions
        );

        this.entityName = entityTypeName;
    }

    public addDialog() {
        this.tmpEntity = {
            content: "",
        };
        this.createForm(this.tmpEntity);
        this.dialogHeader = 'Add ' + this.entityName;
        this.dialogOk = () => {
            this.datasource.add(this.tmpEntity);
            this.datasource.saveChanges()
                .then(() => this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true))
                .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
            this.clearDialog();
        };
        this.dialogCancel = () => {
            this.clearDialog();
        };
        this.showDialog = true;
    }

    public removeDialog(event) {
        if (event.length == 0) return;

        let multiple = event.length > 1;
        this.dialogCancel = () => {
        };
        this.dialogHeader = "WARNING!";
        this.dialogContent = multiple ?
            "All selected entities will be deleted. Do you wish to continue?" :
            "The selected entity will be deleted. Do you wish to continue?";
        this.dialogOk = multiple ?
            () => {
                this.datasource.removeAll(event);
                this.datasource.saveChanges(event);
            }
            : () => {
            this.datasource.remove(event);
            this.datasource.saveChanges();
        };
        this.showDialog = true;
    }

    public editDialog(item): void {
        this.tmpEntity = item;
        this.createForm(item);
        this.dialogHeader = 'Edit ' + this.entityName;

        this.dialogOk = () => {
            this.datasource.saveChanges()
                .then(
                    () => {
                        this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true);
                        this.datasource.rejectChanges()
                            .then(()=> this.datasource.reload());
                        this.clearDialog();
                    }
                )
                .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
            this.clearDialog();
        };
        //Cancel
        this.dialogCancel = () => {
            this.clearDialog();
        };
        this.showDialog = true;
    }

    public createForm(model) {
        if (!this.form) {
            this.form = this.fb.group({});
        }
        this.fm.addStringMessage("required", "This field is required.");
        this.fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        this.fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        this.fm.addStringMessage("minlength", "Should have atleast 2 Characters");

        console.log("this is the fucking fc " + this.fc);
        let localFc = this.fc;
        ["input"].forEach(field=> {
            localFc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });
        // function (field) {
        //
        // });

        this.Stream = new FormlyEventEmitter();
        let ffc: FormlyFieldConfig = {
            type: "input",
            key: "content",
            templateOptions: {
                type: "text",
                label: "Content",
                disabled: false,
                placeholder: "content",
            }
        };

        this.formFields.push(ffc);

        this.Stream.emit({
            model: model,
            fields: this.GetFieldsConfig()
        });
        // }, 0);
    }

    private formFields: Array < FormlyFieldConfig > = [];


    ok() {
        this.showDialog = false;
        this.dialogOk();
        this.clearDialog();
    }

    cancel() {
        this.showDialog = false;
        this.dialogCancel();
        this.clearDialog();

    }

    clearDialog() {
        this.dialogContent = null;
        this.dialogOk = null;
        this.dialogCancel = null;
        // this.tmpEntity = null;
        this.dialogHeader = null;
    }

    clearData() {
        this.tmpEntity = null;
    }

    resetModel() {
        this.tmpEntity = {content: ""}
    }


}