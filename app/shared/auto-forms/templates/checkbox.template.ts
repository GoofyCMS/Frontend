import {Component} from "@angular/core";
import {Field} from "./field";
import {AutoFormsMessages} from "./../services/messages.service";
import {AutoFormsSubject} from "./../services/event-emitter.service";
import {AbstractControl, FormBuilder} from "@angular/common";


@Component({
    selector: "af-field-checkbox",
    template: `
    <div class="form-group">
      <div [ngFormModel]="form">
        <label class="c-input c-checkbox">
          <input type="checkbox" [ngControl]="key" (change)="inputChange($event, 'checked')"
            *ngIf="!templateOptions.hidden" [disabled]="templateOptions.disabled" value="on"> {{templateOptions.label}}
            <span class="c-indicator"></span>
          </label>
      </div>
      <small class="text-muted">{{templateOptions.description}}</small>
    </div>
    `,
})
export class AutoFormsFieldCheckbox extends Field {
    constructor(afm: AutoFormsMessages, afps: AutoFormsSubject, private formBuilder: FormBuilder) {
        super(afm, afps);
    }

    createControl(): AbstractControl {
        return this.formBuilder.control(this._model[this.key] ? "on" : undefined)
    }
}
