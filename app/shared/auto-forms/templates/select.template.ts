import {Component} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
@Component({
    selector: "af-field-select",
    template: `
        <div class="select" [ngFormModel]="form">
            <label for="" class="form-control-label">{{options.label}}</label>
            <select [id]="key" [ngControl]="key" (change)="inputChange($event, 'value')" class="c-select">
                <option value="" *ngIf="options.placeholder">{{options.placeholder}}</option>
                <option *ngFor="#opt of options.options" [value]="opt.value">{{opt.label}}</option>
            </select>
            <small class="text-muted">{{options.description}}</small>
        </div>
    `,
})
export class AutoFormsFieldSelect extends Field {
    constructor(afm: AutoFormsMessages, afs: AutoFormsSubject) {
        super(afm, afs);
    }
}
