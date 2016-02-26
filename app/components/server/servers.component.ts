"use strict";
import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {ServerService} from './server.service';
import {Server} from './server';


@Component({
    selector: 'servers',
    templateUrl: 'app/components/server/servers.component.html',
    providers: [ServerService]
})

export class ServersComponent implements OnInit {
    public servers:Server[];


    constructor(private _serverService:ServerService) {
    }

    getServers() {
        this.servers = [];

        this._serverService.getServers()
            .subscribe(s=> this.servers.push(s));
    }

    ngOnInit() {
        this.getServers();
    }
}