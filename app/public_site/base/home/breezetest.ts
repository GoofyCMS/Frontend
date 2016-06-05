import {Component, Inject} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {UnitOfWork} from "../../../shared/services/unitofwork";
import {EventAggregator} from "../../../shared/services/event-aggregator";
import {Logger} from "../../../shared/resources/logger";


@Component({
    selector: "breezetest",
    templateUrl: "./app/public_site/base/home/breezetest.html",
    directives: []
})
export class BreezeTest {
    // private _eventAggregator;
    // private _logger;
    // private _uoc: UnitOfWork;

    constructor() {
        // this._eventAggregator = new EventAggregator();
        // this._logger = new Logger();
        //
        // this._logger(null, "!!!!!!!!!!! ALONE REQUEST !!!!!!!", null, this);
        //
        //
        // this._uoc.getRepository('plugins');
    }
}