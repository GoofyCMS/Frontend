import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../shared/services/unitofwork";
import {BaseService} from "../base.service";
import {Http, RequestOptionsArgs} from "@angular/http";
import {contentHeaders} from "../../shared/services/headers";
import {AuthService} from "../../shared/services/auth.service";

@Injectable()
export class PluginsService extends BaseService {
    public pluginsList = [];
    constructor(@Inject('AuthServiceProvider') public _authService: AuthService,
                @Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory,
                private _http: Http) {
        super(_uowf, "administration", "PluginItem");
        this.getP();
    }
    public getP(): void {
        this._repo.getAll()
            .then(
                res=> this.pluginsList = res.results
            );
    }
    public getPlugins() {
        return this._repo.getAll()
    }



    public changeState(plugin) {
        let id = plugin.id;
        let body: any = JSON.stringify({id});
        let requestOptionArgs: RequestOptionsArgs = {headers: this._authService.headers};
        if (plugin.enabled) {
            this._http.post(`http://localhost:5000/api/administration/plugins/enable/${plugin.id}`, body, requestOptionArgs).subscribe();
            this.registerContext(plugin.name.toLowerCase() + "Admin");
            this.registerContext(plugin.name.toLowerCase() + "Public");
        }
        else
            this._http.post(`http://localhost:5000/api/administration/plugins/disable/${plugin.id}`, body, requestOptionArgs).subscribe();

    }

}
