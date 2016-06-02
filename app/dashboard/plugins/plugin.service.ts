import {Injectable} from "@angular/core";
import {PLUGINS} from "./mock-plugins";
import {Observable} from "rxjs/rx";

@Injectable()
export class PluginsService {
    getPlugins(){
        return Observable.from(PLUGINS);
    }

    getPlugin(id: number) {
        return Observable.from(PLUGINS)
            .filter(s => s.id === id)
            .subscribe();
    }
}
