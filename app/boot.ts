// import {provide} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
// import {LocationStrategy, PathLocationStrategy} from "@angular/platform/common";
import {HTTP_PROVIDERS} from "@angular/http";
import "rxjs/add/operator/map";
// import {LogService} from "angular2-log/log";
import {GoofyAppComponent} from "./goofy.app.component";

bootstrap(GoofyAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    // provide(LocationStrategy, {useClass: PathLocationStrategy}),
    // LogService,
]).then(
    success => console.log("GoofyApp bootstrapeed!!"),
    error => console.log(error)
);
