import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {PluginsService} from "./plugin.service";
import {IPlugin} from "./plugin";
import {InputSwitch} from "primeng/primeng";
import {CanActivate} from "@angular/router-deprecated";
import {AuthService} from "../base/login/auth.Service";
import {Observable, Subscriber} from "rxjs/rx";
import {UnitOfWorkFactory, UnitOfWork} from "../../shared/services/unitofwork";
import {Resolver} from "../../shared/contextResolver";

@Component({
    selector: "plugins",
    templateUrl: "./app/dashboard/plugins/plugins.component.html",
    directives: [InputSwitch],
    providers: [PluginsService],
})
// @CanActivate(
//     (nextInstr: any, currInstr: any) => {
//         let injector: any = ReflectiveInjector.resolveAndCreate([AuthService]);
//         let authService: AuthService = injector.get(AuthService);
//         return authService.isLogged();
//     }
// )
export class PluginsComponent implements OnInit {
    public _plugins: any[];

    constructor(private _pluginsService: PluginsService) {
    }

    public getPlugins(): void {
        this._plugins = [];
        this._pluginsService.getPlugins()
            .then(
                s=> {
                    this._plugins = s.results;
                }
            );
    }

    public getPlugin(id: number) {
        return this._pluginsService.getPlugin(id);
    }

    ngOnInit(): void {
        this.getPlugins();
    }
}
