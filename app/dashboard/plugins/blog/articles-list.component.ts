import {Component, OnInit, Inject} from "@angular/core";
import {ArticleService} from "./article.service";
import {Dialog, Button, MultiSelect, InputText, Calendar} from "primeng/primeng";
import {DataTableWrapper} from "../../../shared/resources/datatable";
import {FormlyForm} from "./../../../shared/auto-forms/components/formly.form";
import {FormlyMessages} from "./../../../shared/auto-forms/services/formly.messages";
import {FormlyConfig} from "./../../../shared/auto-forms/services/formly.config";
import {Logger} from "./../../../shared/resources/logger";
import {Router} from "@angular/router-deprecated";
import {CrudDialogManagerComponent} from "../../../shared/base-classes/crud-dialog-manager.component";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {FormBuilder} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";

// for autorforms

@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [FormlyForm, Button, Dialog, DataTableWrapper, Dialog, Button, InputText, MultiSelect, Calendar],
    providers: [ArticleService, FormlyConfig, FormlyMessages],
})

export class ArticleListComponent extends CrudDialogManagerComponent implements OnInit {

    constructor(@Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject(Logger) logger: Logger,
                @Inject(Router) router,
                @Inject('AuthServiceProvider') public _authService: AuthService,
                fm: FormlyMessages,
                fc: FormlyConfig,
                fb: FormBuilder) {
        super(uowf, logger, router, 'blogAdmin', 'ArticleItem', fm, fc, fb);
    }

    ngOnInit(): void {
    }

}
