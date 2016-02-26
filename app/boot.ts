import {Component, provide} from 'angular2/core'
import {bootstrap, ELEMENT_PROBE_PROVIDERS}  from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

import {GoofyAppComponent} from './goofy.app.component';

    bootstrap(GoofyAppComponent, [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: PathLocationStrategy })
    ]).then(
        success => console.log('GoofyApp bootstrapeed!!'),
        error => console.log(error)
    );
