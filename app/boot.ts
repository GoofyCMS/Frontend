import {provide} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";
import {LocationStrategy, PathLocationStrategy} from "angular2/platform/common";
import {HTTP_PROVIDERS} from "angular2/http";
import "rxjs/add/operator/map";
import {LogService} from "angular2-log/log";
import {GoofyAppComponent} from "./goofy.app.component";

bootstrap(GoofyAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: PathLocationStrategy}),
    LogService,
]).then(
    success => console.log("GoofyApp bootstrapeed!!"),
    error => console.log(error)
);
