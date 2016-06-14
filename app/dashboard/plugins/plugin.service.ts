import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../shared/services/unitofwork";
import {BaseService} from "../base.service";

@Injectable()
export class PluginsService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "plugin", "PluginItem");
    }

    getPlugins() {
        return this.getAll()
    }

    getPlugin(id: number) {
    }
}
