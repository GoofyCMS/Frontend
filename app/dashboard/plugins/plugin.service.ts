import {Injectable, Inject} from "@angular/core";
import {PLUGINS} from "./mock-plugins";
import {Observable} from "rxjs/rx";
import {Logger} from "../../shared/resources/logger";
import {EventAggregator} from "../../shared/services/event-aggregator";
import {UnitOfWorkFactory, UnitOfWork} from "../../shared/services/unitofwork";
import {Datasource} from "../../shared/services/datasource";
import {Repository} from "../../shared/services/repository";
import {FromObservable} from "rxjs/observable/FromObservable";
import {ObservableWrapper} from "@angular/router-deprecated/src/facade/async";
import {Resolver} from "../../shared/contextResolver";
import {throwError} from "rxjs/util/throwError";

@Injectable()
export class PluginsService {
    private _logger;
    private _repo: Repository;
    private _datasource: Datasource = null;

    constructor(@Inject(UnitOfWorkFactory) private _uowf: UnitOfWorkFactory) {
        let pluginContext: UnitOfWork = this._uowf.getContext("plugin");
        this._repo = pluginContext.getRepository('PluginItem');
        this._datasource = new Datasource(this._repo);
    }

    getPlugins() {
        return this._repo.getAll();
    }

    getPlugin(id: number) {
    }
}
