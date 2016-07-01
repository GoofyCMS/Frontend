import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {PluginsService} from "./plugin.service";
import {InputSwitch} from "primeng/primeng";
import {CanActivate} from "@angular/router-deprecated";
import {AuthService} from "../../shared/services/auth.service";
import {Observable, Subscriber} from "rxjs/rx";
import {PLUGINS} from "../../shared/mocks/mock-plugins";

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
//         return authService.IsLogged();
//     }
// )
export class PluginsComponent implements OnInit {
    private _plugins: any;

    constructor(public _pluginsService: PluginsService, @Inject(AuthService) public _authService: AuthService) {

    }

    public getPlugins(): void {
        // this._pluginsService.getPlugins()
        //     .then(
        //         res=> this._plugins = res.results
        //     );
        this._plugins = PLUGINS;
    }

    changeState(plugin) {
        this._pluginsService.changeState(plugin);
    }

    ngOnInit(): void {
        this.getPlugins();
    }
}
