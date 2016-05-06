import {Component, OnInit} from "angular2/core";
import {ServerService} from "./server.service";
import {Server} from "./server";
import {LogService} from "angular2-log/log";


@Component({
    selector: "servers",
    templateUrl: "./app/dashboard/server/servers.component.html",
    providers: [ServerService]
})

export class ServersComponent implements OnInit {
    public servers: Server[];

    constructor(private _serverService: ServerService, public logService: LogService) {
    }

    getServers() {
        this.servers = [];

        this._serverService.getServers()
            .subscribe(s => this.servers.push(s));

        this.logService.to("server.component").debug("from getServers() call to _serverService.getServers()", this._serverService.getServers());
    }

    ngOnInit() {
        this.getServers();
        this.logService.to("server.component").debug("from ngOnInit() call to getServers()", this.getServers());
    }
}