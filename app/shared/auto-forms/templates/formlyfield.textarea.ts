import {Component, AfterViewInit, ElementRef} from "@angular/core";
import {FormlyPubSub} from "../services/formly.event.emitter";
import {FormlyMessages} from "../services/formly.messages";
import {Field} from "./field";
import {InputTextarea} from "primeng/primeng";

@Component({
    selector: "formly-field-textarea",
    template: `
        <div class="ui-grid-row" [ngFormModel]="form" *ngIf="!templateOptions.hidden">
            <div class="ui-grid-col-1">
                <label attr.for="{{key}}" class="form-control-label">{{templateOptions.label}}</label>
            </div>
            <div class="ui-grid-col-11">
                <textarea pInputTextarea 
                        name="{{key}}"
                        [ngControl]="key" 
                        id="{{key}}" 
                        [(ngModel)]="model" 
                        cols="{{templateOptions.cols}}"
                        rows="{{templateOptions.rows}}" 
                        (change)="inputChange($event, 'value')" 
                        (keyup)="inputChange($event, 'value')"
                        placeholder="{{templateOptions.placeholder}}" 
                        class=""
                        disabled="{{templateOptions.disabled}}">
                </textarea>
                <div class="ui-grid-row">
                <small class="text-muted">{{templateOptions.description}}</small>
                </div>
            </div>
        </div>
    `,
    directives: [InputTextarea],
    inputs: ["form", "update", "templateOptions", "key", "field", "formModel", "model"]
})
export class FormlyFieldTextArea extends Field implements AfterViewInit {
    constructor(fm: FormlyMessages, ps: FormlyPubSub, private  elem: ElementRef) {
        super(fm, ps);
    }

    ngAfterViewInit() {
        if (this.templateOptions.focus) {
            this.elem.nativeElement.querySelector("textarea").focus();
        }
    }
}
