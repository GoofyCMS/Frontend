import {Component} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
@Component({
    selector: "af-field-select",
    template: `
       <div class="select" [ngFormModel]="form">
          <label for="" class="form-control-label">{{templateOptions.label}}</label>
          <select [id]="key" [ngControl]="key" (change)="inputChange($event, 'value')" class="c-select">
            <option value="" *ngIf="templateOptions.placeholder">{{templateOptions.placeholder}}</option>
            <option *ngFor="let opt of templateOptions.options" [value]="opt.value">{{opt.label}}</option>
          </select>
          <small class="text-muted">{{templateOptions.description}}</small>
        </div>
    `,
})
export class AutoFormsFieldSelect extends Field {
    constructor(afm: AutoFormsMessages, afps: AutoFormsSubject) {
        super(afm, afps);
    }
}
