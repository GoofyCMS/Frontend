import {Component} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service.ts";
import {Field} from "./field";
@Component({
    selector: "af-field-radio",
    template: `
        <div [ngFormModel]="form">
            <div [ngControlGroup]="key" class="form-group">
                <label class="form-control-label" for="">{{options.label}}</label>
                <div *ngFor="#option of options.options">
                    <label class="c-input c-radio">
                        <input type="radio" name="choose" value="{{option.value}}" [ngControl]="option.key" (change)="inputChange($event, 'value')">{{option.value}}
                        <span class="c-indicator"></span>
                    </label>
                </div>
                <small class="text-muted">{{options.description}}</small>
            </div>
        </div>
    `
})
export class AutoFormsFieldRadio extends Field {
    constructor(afm: AutoFormsMessages, afs: AutoFormsSubject) {
        super(afm, afs);
    }
}