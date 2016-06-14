import {Component, ElementRef, AfterViewInit} from "@angular/core";
import {FormlyMessages, FormlyMessage} from "./../services/formly.messages";
import {FormlyPubSub} from "./../services/formly.event.emitter";
import {Field} from "./field";
import {InputText, Spinner} from "primeng/primeng";


@Component({
    selector: "formly-field-input",
    template: `
        <div class="ui-grid-row" [ngFormModel]="form" [ngClass]="{'has-danger': !formControl.valid}" *ngIf="!templateOptions.hidden">
            <div class="ui-grid-col-1">
                <label  class="">{{templateOptions.label}}</label>
            </div>
            <div class="ui-grid-col-11" [ngSwitch]="templateOptions.type">
                <input  *ngSwitchWhen="'password'"
                    type="password"
                    pInputText
                    [ngControl]="key" 
                    class="" 
                    id="{{key}}"
                    placeholder="{{templateOptions.placeholder}}" 
                    [disabled]="templateOptions.disabled"
                    [(ngModel)]="model"
                    [ngClass]="{'form-control-danger': !form.controls[key].valid}">
                <p-spinner *ngSwitchWhen="'number'"
                        [ngControl]="key" 
                        class="" 
                        id="{{key}}"
                        [disabled]="templateOptions.disabled"
                        (keyup)="inputChange($event, 'value')" 
                        (change)="inputChange($event, 'value')" 
                        [(ngModel)]="model"
                        [ngClass]="{'form-control-danger': !form.controls[key].valid}">
                </p-spinner>
                <input *ngSwitchDefault
                    pInputText 
                    [ngControl]="key" 
                    class="" 
                    id="{{key}}"
                    placeholder="{{templateOptions.placeholder}}" 
                    [disabled]="templateOptions.disabled"
                    (keyup)="inputChange($event, 'value')" 
                    (change)="inputChange($event, 'value')" 
                    [(ngModel)]="model"
                    [ngClass]="{'form-control-danger': !form.controls[key].valid}">
                
            </div>
            <div class="ui-grid-row">
                <small class=""><formly-message [control]="key"></formly-message></small>
                <small class="">{{templateOptions.description}}</small>
            </div>
        </div>
    `,
    directives: [FormlyMessage, InputText, Spinner],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldInput extends Field implements AfterViewInit {


    constructor(fm: FormlyMessages, ps: FormlyPubSub, private elem: ElementRef) {
        super(fm, ps);
    }

    ngAfterViewInit() {
        if (this.templateOptions.focus) {
            this.elem.nativeElement.querySelector("input").focus();
        }
    }
}
