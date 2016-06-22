import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {BaseService} from "../../base.service";
import {Http, RequestOptionsArgs} from "@angular/http";
import {contentHeaders} from "../../../shared/services/headers";
import {AuthService} from "../../../shared/services/auth.service";

@Injectable()
export class SidebarService extends BaseService {

    constructor(@Inject('AuthServiceProvider') public _authService: AuthService,
                @Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory,
                private _http: Http) {
        super(_uowf, "administration", "PluginItem");
        this.getPlugins();
    }

    public getPlugins() {
        return this._repo.getAll()
    }


}
