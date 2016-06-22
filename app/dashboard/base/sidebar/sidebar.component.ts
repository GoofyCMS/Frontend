import {Component, OnInit, Input} from "@angular/core";
import {RouterLink, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {BaseService} from "../../base.service";
import {PluginsService} from "../../plugins/plugin.service"

@Component({
    selector: "sidebar",
    styleUrls: ["./app/dashboard/base/sidebar/sidebar.component.css"],
    templateUrl: "./app/dashboard/base/sidebar/sidebar.component.html",
    directives: [ROUTER_DIRECTIVES, RouterLink],
    providers: [PluginsService]
})
export class Sidebar implements OnInit {
    @Input() private _plugins: any[];

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    toggleMenu(e: any): void {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }

    constructor(private _pluginsService: PluginsService) {
    }

    public isActive(name): boolean {
        for (let i = 0; i < this._plugins.length; i++) {
            if (this._plugins[i].name == name && this._plugins[i].enabled)
                return true;
        }

        return false;
    }

    public getPlugins(): void {
        this._plugins = this._pluginsService.pluginsList;
        this._pluginsService.getPlugins()
            .then(
                res=> this._plugins = res.results
            );
    }

    ngOnInit(): void {
        this.getPlugins();
    }
}
