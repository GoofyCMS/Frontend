"use strict";
import {Injectable} from 'angular2/core'
import {SERVERS} from './mock-servers';
import {Server} from './server';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/rx';

@Injectable()
export class ServerService {
    getServers() {
        return Observable.fromArray(SERVERS);
    }

    getServer(id:number) {
        return Observable.fromArray(SERVERS)
            .filter(s=> s.id == id)
            .subscribe();
    }
}
