import {UnitOfWorkFactory, UnitOfWork} from "./services/unitofwork";
import {Inject} from "@angular/core";
import {EventAggregator} from "./services/event-aggregator";
import {Logger} from "./resources/logger";


export class Resolver {

    private _eventAggregator: EventAggregator;
    private _logger: Logger;
    private _uowf: UnitOfWorkFactory;

    constructor() {
        this._eventAggregator = new EventAggregator();
        this._logger = new Logger();
        this._uowf = new UnitOfWorkFactory(this._logger, this._eventAggregator);
    }

    ConfigureAndGetContext(modules: string[]) {
        return this._uowf.configure(modules);
    }
    

}
