import {ControlService} from "./control.service";
import {AutoFormsSubject} from "./event-emitter.service";
import {AutoFormsMessages} from "./messages.service.ts";

export const AutoFormsProviders = [
    ControlService,
    AutoFormsSubject,
    AutoFormsMessages,
];
