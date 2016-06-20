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

@Component({
    selector: "user-claims",
    templateUrl: "./app/dashboard/base/auth/user/user-claims.component.html",
    directives: [FormlyForm, Button, Dialog, DataTableWrapper, Dialog, Button, InputText, MultiSelect],
    providers: [FormlyConfig, FormlyMessages],
})
export class UserClaimComponent extends CrudDialogManagerComponent implements OnInit {
    constructor(@Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject(Logger) logger: Logger,
                @Inject(Router) router) {
        super(uowf, logger, router, 'administration', 'IdentityUserClaimItem');
    }

    ngOnInit(): void {
    }
}


