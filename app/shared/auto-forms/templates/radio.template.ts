import {Component} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
import {RadioButtonState, Control, ControlGroup, AbstractControl, FormBuilder} from "@angular/common";

@Component({
    selector: "af-field-radio",
    template: `
        <div [ngFormModel]="form">
          <div [ngControlGroup]="key" class="form-group">
            <label class="form-control-label" for="">{{templateOptions.label}}</label>
            <div *ngFor="let option of templateOptions.options">
              <label class="c-input c-radio">
                <input type="radio" name="choose" value="{{option.value}}" [ngControl]="option.key" (change)="inputChange($event, 'value')">{{option.value}}
                <span class="c-indicator"></span>
              </label>
            </div>
            <small class="text-muted">{{templateOptions.description}}</small>
          </div>
        </div>
    `
})
export class AutoFormsFieldRadio extends Field {
    constructor(afm: AutoFormsMessages, afps: AutoFormsSubject, private formBuilder: FormBuilder) {
        super(afm, afps);
    }

    createControl(): AbstractControl {
        let controlGroupConfig = this.templateOptions.options.reduce((previous, option) => {
            previous[option.key] = [new RadioButtonState(this._model === option.value , option.value)];
            return previous;
        }, {});
        return this.formBuilder.group(controlGroupConfig);
    }

}