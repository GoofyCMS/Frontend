import {Output, Input, EventEmitter, OnInit} from "@angular/core";
import {AutoFormsMessages} from "./../services/messages.service";
import {AutoFormsSubject} from "./../services/event-emitter.service";
import {AutoFormsFieldConfig, AutoFormsTemplateOptions} from "../components/field.config";
import {Control, AbstractControl} from "@angular/common";


export class Field implements OnInit {

    @Input() form;
    @Input() update;
    @Input() templateOptions: AutoFormsTemplateOptions;
    @Input() key: string;
    @Input() field: AutoFormsFieldConfig;
    _model: any;

    @Output() changeFn: EventEmitter<any> = new EventEmitter();

    private _messages;
    _control: AbstractControl;

    constructor(afm: AutoFormsMessages, private afps: AutoFormsSubject) {
        this._messages = afm.getMessages();
        this.afps.Stream.subscribe(form => {
            this.form = form;
        });
    }

    ngOnInit() {
        if (this.update) {
            this.update.subscribe((update) => {
                this.templateOptions[update.key] = update.value;
            });
        }
    }

    inputChange(e, val) {
        this.changeFn.emit(e.target[val]);
        this.afps.setUpdated(true);
    }

    createControl(): AbstractControl {
        return new Control(this._model || "", this.field.validation);
    }

    get formControl(): AbstractControl {
        if (!this._control) {
            this._control = this.createControl();
        }
        return this._control;
    }
}
