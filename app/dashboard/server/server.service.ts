import {Injectable} from "@angular/core";
import {SERVERS} from "./mock-servers";
import {Observable} from "rxjs/rx";

@Injectable()
export class ServerService {
    getServers() {
        return Observable.from(SERVERS);
    }

    getServer(id: number) {
        return Observable.from(SERVERS)
            .filter(s => s.id === id)
            .subscribe();
    }
}
