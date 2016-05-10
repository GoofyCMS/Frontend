import {Component, OnInit} from "@angular/core";
import {ServerService} from "./server.service";
import {Server} from "./server";


@Component({
    selector: "servers",
    templateUrl: "./app/dashboard/server/servers.component.html",
    providers: [ServerService],
})

export class ServersComponent implements OnInit {
    public servers: Server[];

    constructor(private _serverService: ServerService) {
    }

    public getServers(): any {
        this.servers = [];

        this._serverService.getServers()
            .subscribe(s => this.servers.push(s));

    }
    ngOnInit(): void {
        this.getServers();
    }
}
