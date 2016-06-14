import {Component} from "@angular/core";
import {Field} from "./field";
import {FormlyMessages} from "./../services/formly.messages";
import {FormlyPubSub, FormlyValueChangeEvent} from "./../services/formly.event.emitter";
import {AbstractControl, FormBuilder} from "@angular/common";
import {Checkbox} from "primeng/primeng";


@Component({
    selector: "formly-field-checkbox",
    template: `
        <div [ngFormModel]="form">
            <div class="ui-grid-row">
                <div class="ui-grid-col-1">
                    <p-checkbox 
                        [ngControl]="key"
                        (onChange)="inputChange($event, 'checked')" 
                        [(ngModel)]="model" 
                        >
                    </p-checkbox>
                </div>
                <div class="ui-grid-col-11"><label class="ui-widget">{{templateOptions.label}}</label></div>
            </div>
        </div>
        <small class="text-muted">{{templateOptions.description}}</small>
    `,
    directives: [Checkbox],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldCheckbox extends Field {

    constructor(fm: FormlyMessages, ps: FormlyPubSub, private formBuilder: FormBuilder) {
        super(fm, ps);
    }

    // createControl(): AbstractControl {
    //     return this.formBuilder.control(this._model ? false : undefined);
    // }

    inputChange(e, val) {
        this._model = e.checked;
        this.changeFn.emit(new FormlyValueChangeEvent(this.key, e.checked));
        this.ps.setUpdated(true);
    }

}
