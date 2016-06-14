import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UnitOfWork, UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {EventAggregator} from "../../../shared/services/event-aggregator";
import {Logger} from "../../../shared/resources/logger";
import {Repository} from "../../../shared/services/repository";
import {Datasource} from "../../../shared/services/datasource";
import {Observable, Subscriber} from "rxjs/rx";
import {InputSwitch} from "primeng/primeng"


@Component({
    selector: "breezetest",
    templateUrl: "./app/public_site/base/home/breezetest.html",
    directives: [InputSwitch],
    providers: [],
})
export class BreezeTest {
    private _elems: any[];
    
    constructor() {
        //
        // let modules = [];
        // let context;
        // let articles;
        //
        // if (modules.length > 0)
        //     uowf.configure(modules)
        //         .then(response => {
        //             logger.logInfo("Success", "Modules in component breezetest loaded", response, uowf);
        //
        //             for (var module of modules) {
        //                 context = uowf.getContext(module);
        //                 logger.logInfo("Getting Context", module + " data", context, this, true);
        //             }
        //
        //             articles = context.getRepository('ArticleItems');
        //             logger.logInfo("Getting Repository", "Article data", articles, this, true);
        //
        //             (<Repository>articles).getAll();
        //         })
        //         .catch(error => logger.logError("Error!", "Error Loading Modules", error, this, true));

     
       
    }
}
