import {Component, OnInit, Inject} from "@angular/core";
import {ArticleService} from "./article.service";
import {Dialog, Button, MultiSelect, InputText} from "primeng/primeng";
import {DataTableWrapper} from "../../../shared/resources/datatable";
import {FormlyForm} from "./../../../shared/auto-forms/components/formly.form";
import {FormlyMessages} from "./../../../shared/auto-forms/services/formly.messages";
import {FormlyConfig} from "./../../../shared/auto-forms/services/formly.config";
import {Logger} from "./../../../shared/resources/logger";
import {Router} from "@angular/router-deprecated";
import {CrudDialogManagerComponent} from "../../../shared/base-classes/crud-dialog-manager.component";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";

// for autorforms

@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [FormlyForm, Button, Dialog, DataTableWrapper, Dialog, Button, InputText, MultiSelect],
    providers: [ArticleService, FormlyConfig, FormlyMessages],
})

export class ArticleListComponent extends CrudDialogManagerComponent implements OnInit {
    constructor(@Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject(Logger) logger: Logger,
                @Inject(Router) router) {
        super(uowf, logger, router, 'blog', 'ArticleItem');
    }

    ngOnInit(): void {
    }

}
