import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../shared/services/unitofwork";
import {BaseService} from "../base.service";
import {Http, RequestOptionsArgs} from "@angular/http";
import {contentHeaders} from "../../shared/services/headers";

@Injectable()
export class PluginsService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory, private _http: Http) {
        super(_uowf, "administration", "PluginItem");
        this.getPlugins();
    }

    public getPlugins() {
        return this._repo.getAll()
    }

    public changeState(plugin) {
        let id = plugin.id;
        let body: any = JSON.stringify({id});
        let requestOptionArgs: RequestOptionsArgs = {headers: contentHeaders};
        if (plugin.enabled) {
            this._http.post(`http://localhost:5000/api/administration/plugins/enable/${plugin.id}`, body, requestOptionArgs).subscribe();
            this.registerContext(plugin.name.toLowerCase());
        }
        else
            this._http.post(`http://localhost:5000/api/administration/plugins/disable/${plugin.id}`, body, requestOptionArgs).subscribe();
    }

}
