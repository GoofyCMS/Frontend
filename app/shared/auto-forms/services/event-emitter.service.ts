import {Subject} from "rxjs/Subject";

export class AutoFormsEventEmitter extends Subject<string> {
    constructor() {
        super();
    }

    emit(value) {
        super.next(value);
    }
}

export class AutoFormsSubject {
    Stream:AutoFormsEventEmitter;
    emitters = {};
    updated = false;

    constructor() {
        this.Stream = new AutoFormsEventEmitter();
    }

    getUpdated() {
        return this.updated;
    }

    setUpdated(value) {
        this.updated = value;
    }

    getEmitter(key) {
        return this.emitters[key];
    }

    setEmitter(key, emitter) {
        this.emitters[key] = emitter;
    }
}