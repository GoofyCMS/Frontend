import {Component, OnInit, Input} from "angular2/core";
import {ControlGroup, NgFormModel} from "angular2/common";
import {AutoFormsField} from "./field.component";
import {ControlService} from "./../services/control.service";
import {AutoFormsEventEmitter, AutoFormsSubject} from "./../services/event-emitter.service";
import {AutoFormsBaseComponent} from "./base.component";
import {implementsOnDestroy} from "angular2/src/core/change_detection/pipe_lifecycle_reflector";

export class AutoFormsFormComponent extends AutoFormsBaseComponent implements OnInit {

    @Input() fields;
    @Input() changeEmitter;

    @Input() form: ControlGroup;
    event;

    constructor(private _cs: ControlService, private _fm: NgFormModel, private afsub: AutoFormsSubject) {
        super();
        this.event = new AutoFormsEventEmitter();
    }

    ngOnInit() {
        if (!this.model) {
            this.model = {};
        }
        this.form = this._cs.toControlGroup(this.fields, this.model, undefined, undefined);
        if (this.changeEmitter) {
            this.changeEmitter.subscribe((info)=> {
                if (info.model) {
                    this.model = info.model;
                }
                if (info.fields) {
                    this.fields = info.fields;
                }
                this.form = this._cs.toControlGroup(this.fields, this.model, undefined, undefined);
                this.afsub.Stream.emit(this.form);
            });
        }
        this.event.subscribe((info)=> {
            this.form = this._cs.toControlGroup(this.fields, this.model, info.key, info.value);
            this.afsub.Stream.emit(this.form);
        });
    }

    changeFunction(value, field) {
        this.model[field.key] = value;
        this.formSubmit.emit(value);
    }

}

