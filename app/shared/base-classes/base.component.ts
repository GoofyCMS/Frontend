import {Logger} from "../resources/logger";
import {Router} from "@angular/router-deprecated";
import {ReflectiveInjector} from "@angular/core";

export class BaseComponent {

    public router: Router;

    constructor(protected logger: Logger) {
        // let injector: any = ReflectiveInjector.resolveAndCreate([Logger, Router]);
        this.logger = new Logger();
        // this.router = new Router();
        //
        // this.router.subscribe(() => {
        //     debugger;
        // });
    }
}