import {Component, Input} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
import {FormBuilder, AbstractControl} from "@angular/common";

@Component({
    selector: "af-field-multicheckbox",
    template: `
        <div [ngFormModel]="form">
            <div [ngControlGroup]="key" class="form-group">
                <label class="form-control-label" for="">{{templateOptions.label}}</label>
                <div *ngFor="let option of templateOptions.options">
                    <label class="c-input c-radio">
                        <input type="checkbox" name="choose" value="{{option.value}}" [ngControl]="option.key" (change)="inputChange($event, option.key)">{{option.value}}
                        <span class="c-indicator"></span>
                    </label>
                </div>
                <small class="text-muted">{{templateOptions.description}}</small>
            </div>
        </div>
    `
})
export class AutoFormsFieldMultiCheckbox extends Field {

    @Input() model: Object;

    constructor(afm: AutoFormsMessages, private afps: AutoFormsSubject, private formBuilder: FormBuilder) {
        super(afm, afps);
    }

    inputChange(e, val) {
        this._model[val] = e.target.checked;
        this.changeFn.emit(this.model);
        this.afps.setUpdated(true);
    }

    createControl(): AbstractControl {
        let controlGroupConfig = this.templateOptions.options.reduce((previous, option) => {
            previous[option.key] = [this._model ? this._model[option.key] : undefined];
            return previous;
        }, {});
        return this.formBuilder.group(controlGroupConfig);
    }
}
