import {Component, OnInit, ReflectiveInjector} from "@angular/core";
import {PluginsService} from "./plugin.service";
import {IPlugin} from "./plugin";
import {InputSwitch} from "primeng/primeng";
import {CanActivate} from "@angular/router-deprecated";
import {AuthService} from "../base/login/auth.Service";

@Component({
    selector: "plugins",
    templateUrl: "./app/dashboard/plugins/plugins.component.html",
    directives: [InputSwitch],
    providers: [PluginsService],
})
@CanActivate(
    (nextInstr: any, currInstr: any) => {
        let injector: any = ReflectiveInjector.resolveAndCreate([AuthService]);
        let authService: AuthService = injector.get(AuthService);
        return authService.isLogged();
    }
)
export class PluginsComponent implements OnInit {
    public _plugins: IPlugin[];

    constructor(private _pluginsService: PluginsService) {
    }

    public getPlugins(): void {
        this._plugins = [];

        this._pluginsService.getPlugins()
            .subscribe(s => this._plugins.push(s));
    }

    public getPlugin(id: number) {
        return this._pluginsService.getPlugin(id);
    }

    ngOnInit(): void {
        this.getPlugins();
    }
}
