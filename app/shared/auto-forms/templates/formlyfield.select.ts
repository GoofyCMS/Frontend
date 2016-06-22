import {Component, Inject} from "@angular/core";
import {FormlyPubSub, FormlyValueChangeEvent} from "../services/formly.event.emitter";
import {FormlyMessages} from "../services/formly.messages";
import {Field} from "./field";
import {Dropdown, SelectItem, MultiSelect} from "primeng/primeng";

@Component({
    selector: "formly-field-select",
    template: `
        <div class="" [ngFormModel]="form">
            <div class="">
                <label for="" class="">{{templateOptions.label}}</label>
            </div>
            <div class="">
                <p-dropdown 
                    [id]="key" 
                    [ngControl]="key" 
                    (onChange)="inputChange($event, 'event.value')" 
                    [(ngModel)]="model"
                    [options]="templateOptions.options">
                </p-dropdown>
            </div>
            <small class="text-muted">{{templateOptions.description}}</small>
        </div>
    `,
    directives: [Dropdown, MultiSelect],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldSelect extends Field {

    constructor(fm: FormlyMessages, ps: FormlyPubSub) {
        super(fm, ps);
    }

    inputChange(e, val) {
        this._model = e.value;
        this.changeFn.emit(new FormlyValueChangeEvent(this.key, e.value));
        this.ps.setUpdated(true);
    }
}
