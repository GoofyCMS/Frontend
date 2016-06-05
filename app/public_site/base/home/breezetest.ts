import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UnitOfWork, UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {EventAggregator} from "../../../shared/services/event-aggregator";
import {Logger} from "../../../shared/resources/logger";


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
                @Inject('.UnitOfWork') uow: UnitOfWork) {


        let modules = ['plugins', 'blog'];

        uowf.configure(modules)
            .then(response => {

                logger.logInfo("Success", "Modules loaded", response, uowf);
                let t: any;
                for (var module of modules) {
                    t = uowf.getContext(module);
                    logger.logInfo("Getting Context", module + " data", t, this, true);
                }

            })
            .catch(error => logger.logError("Error!", "Error Loading Modules", error, this, true));

        let a: any = uow.getRepository('plugins' + "Item");
        logger.logInfo("Getting Repository", "Plugins data", a, this, true);
        let b: any = uow.getRepository('blog' + "Item");
        logger.logInfo("Getting Repository", "Blog data", b, this, true);

    }
}