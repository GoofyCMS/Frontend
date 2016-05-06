import {Injectable} from "angular2/core";

@Injectable()
export class AutoFormsConfig {
    types = {};
    setType(options) {
        this.types[options.name] = options.component;
    }

    getDirectives() {
        return this.types;
    }
}
