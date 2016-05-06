import {Output, Input, EventEmitter, OnInit, ElementRef, AfterViewInit, AfterViewChecked} from "angular2/core";
import {AutoFormsMessages} from "./../services/messages.service.ts";
import {AutoFormsSubject} from "./../services/event-emitter.service";

export class Field implements OnInit {

    @Input() form;
    @Input() update;
    @Input() options;
    @Output() changeFn: EventEmitter<any> = new EventEmitter();

    private _messages;

    constructor(afm: AutoFormsMessages, private afsub: AutoFormsSubject) {
        this._messages = afm.getMessages();
        this.afsub.Stream.subscribe(form => {
            this.form = form;
        });
    }

    ngOnInit() {
        if (this.update) {
            this.update.subscribe((update) => {
                this.options[update.key] = update.value;
            });
        }
    }

    inputChange(e, val) {
        this.changeFn.emit(e.target[val]);
        this.afsub.setUpdated(true);
    }
}

