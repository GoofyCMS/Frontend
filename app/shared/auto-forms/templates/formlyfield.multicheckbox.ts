import {Component, Input} from "@angular/core";
import {FormlyPubSub, FormlyValueChangeEvent} from "../services/formly.event.emitter";
import {FormlyMessages} from "../services/formly.messages";
import {Field} from "./field";
import {FormBuilder, AbstractControl} from "@angular/common";
import {Checkbox} from "primeng/primeng";
import {Logger} from "../../resources/logger";



@Component({
    selector: "formly-field-multicheckbox",
    template: `
        <div [ngFormModel]="form">
            <div [ngControlGroup]="key" class="form-group">
                <div class="ui-grid-row" *ngFor="let option of templateOptions.options">
                    <div class="ui-grid-col-1">
                        <p-checkbox 
                            name="{{key}}" 
                            value="{{option.value}}"
                            [ngControl]="option.key"
                            (change)="inputChange($event, option.key)" 
                            [(ngModel)]="model"> 
                        </p-checkbox>
                    </div>
                    <div class="ui-grid-col-11">
                        <label class="ui-widget">{{option.value}}</label>
                    </div>
                </div>
                <small class="text-muted">{{templateOptions.description}}</small>
            </div>
        </div>
    `,
    directives: [Checkbox],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldMultiCheckbox extends Field {
    private _logger:Logger;
    constructor(fm: FormlyMessages, private fps: FormlyPubSub, private formBuilder: FormBuilder) {
        super(fm, fps);
    }

    inputChange(e, val) {
        this._model[val] = e.target.checked;
        this.changeFn.emit(new FormlyValueChangeEvent(this.key, this._model));
        this.fps.setUpdated(true);
    }

    createControl(): AbstractControl {
        let controlGroupConfig = this.templateOptions.options.reduce((previous, option) => {
            previous[option.key] = [this._model ? this._model[option.key] : undefined];
            return previous;
        }, {});
        return this.formBuilder.group(controlGroupConfig);
    }
}
