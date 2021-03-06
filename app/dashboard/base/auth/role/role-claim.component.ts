import {ReflectiveInjector} from "@angular/core";
import {Component, OnInit, Inject} from "@angular/core";
import {Dialog, Button, MultiSelect, InputText} from "primeng/primeng";
import {DataTableWrapper} from "../../../../shared/resources/datatable";
import {FormlyForm} from "./../../../../shared/auto-forms/components/formly.form";
import {FormlyMessages} from "./../../../../shared/auto-forms/services/formly.messages";
import {FormlyConfig} from "./../../../../shared/auto-forms/services/formly.config";
import {Logger} from "./../../../../shared/resources/logger";
import {Router} from "@angular/router-deprecated";
import {CrudDialogManagerComponent} from "../../../../shared/base-classes/crud-dialog-manager.component";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {FormBuilder} from "@angular/common";


@Component({
    selector: "role-claims",
    templateUrl: "./app/dashboard/base/auth/role/role-claim.component.html",
    directives: [FormlyForm, Button, Dialog, DataTableWrapper, Dialog, Button, InputText, MultiSelect],
    providers: [FormlyConfig, FormlyMessages],
})

export class RoleClaimComponent extends CrudDialogManagerComponent implements OnInit {
    constructor(@Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject(Logger) logger: Logger,
                @Inject(Router) router,
                fm: FormlyMessages,
                fc: FormlyConfig,
                fb: FormBuilder) {
        super(uowf, logger, router, 'administration', 'IdentityRoleClaimItem', fm,fc,fb);
    }

    ngOnInit(): void {
    }
}

