import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UnitOfWork, UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {EventAggregator} from "../../../shared/services/event-aggregator";
import {Logger} from "../../../shared/resources/logger";
import {Repository} from "../../../shared/services/repository";


@Component({
    selector: "breezetest",
    templateUrl: "./app/public_site/base/home/breezetest.html",
    directives: []
})
export class BreezeTest {
    private _eventAggregator;
    private _logger;
    private _uoc: UnitOfWork;

    constructor(@Inject(Logger) logger: Logger,
                @Inject(EventAggregator) private eventAggregator: EventAggregator,
                @Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject("plugins.UnitOfWork") uow: UnitOfWork) {

        let modules = [];
        let context;
        let blogs;
        let plugins;

        // uowf.configure(modules)
        //     .then(response => {
        //
        //         logger.logInfo("Success", "Modules in component breezetest loaded", response, uowf);
        //         //
        //         // for (var module of modules) {
        //         //     context = uowf.getContext(module);
        //         //     logger.logInfo("Getting Context", module + " data", context, this, true);
        //         // }
        //
        //         logger.logInfo("Getting Context", plugins + " data", uow, this, true);
        //         // blogs = context.getRepository('ArticleItem');
        //         // logger.logInfo("Getting Repository", "Article data", blogs, this, true);
        //
        //
        //
        //
        //         // (<Repository>blogs).getAll();
        //     })
        //
        //     .catch(error => logger.logError("Error!", "Error Loading Modules", error, this, true));

        plugins = uow.getRepository("PluginItem");
        logger.logInfo("Getting Repository", "Plugins data", plugins, this, true);
        (<Repository>plugins).getAll();
    }
}