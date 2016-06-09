import {Component} from "@angular/core";
import {FormlyPubSub, FormlyValueChangeEvent} from "../services/formly.event.emitter";
import {FormlyMessages} from "../services/formly.messages";
import {Field} from "./field";
import {RadioButtonState, Control, ControlGroup, AbstractControl, FormBuilder} from "@angular/common";
import {RadioButton} from "primeng/primeng";


@Component({
    selector: "formly-field-radio",
    template: `
    <div [ngFormModel]="form">
        <div [ngControlGroup]="key" class="">
            <label class="" for="">{{templateOptions.label}}</label>
        <div class="ui-grid-row" *ngFor="let option of templateOptions.options">
        <div class="ui-grid-col-1">
            <p-radioButton 
                name="choose"
                value="{{option.value}}"
                (click)="inputChange($event, 'value')"
                [(ngModel)]="model" >
            </p-radioButton>
        </div>
        <div class="ui-grid-col-11"><label class="ui-widget">{{option.value}}</label></div></div>
        <small class="text-muted">{{templateOptions.description}}</small>
      </div>
    </div>`
    ,
    directives: [RadioButton],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldRadio extends Field {
    // val: string;

    constructor(fm: FormlyMessages, private ps: FormlyPubSub, private formBuilder: FormBuilder) {
        super(fm, ps);
        // this.val = "Mr.";
    }

    createControl(): AbstractControl {
        let controlGroupConfig = this.templateOptions.options.reduce((previous, option) => {
            previous[option.key] = [new RadioButtonState(this._model === option.value, option.value)];
            return previous;
        }, {});
        return this.formBuilder.group(controlGroupConfig);
    }

    inputChange(e, val) {
        this._model = e.currentTarget.childNodes[1].children[0].children[0].defaultValue;
        this.changeFn.emit(new FormlyValueChangeEvent(this.key, e.currentTarget.childNodes[1].children[0].children[0].defaultValue));
        this.ps.setUpdated(true);
    }
}
