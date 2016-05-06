import {Component, AfterViewInit, ElementRef} from "angular2/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
@Component({
    selector: "af-field-textarea",
    template: `
    <fieldset class="form-group" [ngFormModel]="form">
        <label attr.for="{{key}}">{{options.label}}</label>
        <textarea 
            name="{{key}}" 
            [ngControl]="key" 
            id="{{key}}" 
            cols="{{options.cols}}" 
            rows="{{options.rows}}" 
            (change)="inputChange($event, 'value')" 
            (keyup)="inputChange($event, 'value')" 
            placeholder="{{options.placeholder}}" 
            class="form-control">
        </textarea>
        <small class="text-muted">{{options.description}}</small>
    </fieldset>`,
})
export class AutoFormsFieldTextArea extends Field implements AfterViewInit {
    constructor(afm: AutoFormsMessages, afs: AutoFormsSubject, private  elem: ElementRef) {
        super(afm, afs);
    }
    ngAfterViewInit(): void {
        if (this.options.focus) {
            this.elem.nativeElement.querySelector("textarea").focus();
        }
    }
}
