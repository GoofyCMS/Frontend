import {Component, AfterViewInit, ElementRef} from "@angular/core";
import {AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsMessages} from "../services/messages.service";
import {Field} from "./field";
@Component({
    selector: "af-field-textarea",
    template: `
      <fieldset class="form-group" [ngFormModel]="form" *ngIf="!templateOptions.hidden">
      <label attr.for="{{key}}" class="form-control-label">{{templateOptions.label}}</label>
      <textarea name="{{key}}" [ngControl]="key" id="{{key}}" cols="{{templateOptions.cols}}"
        rows="{{templateOptions.rows}}" (change)="inputChange($event, 'value')" (keyup)="inputChange($event, 'value')"
        placeholder="{{templateOptions.placeholder}}" class="form-control" [disabled]="templateOptions.disabled"></textarea>
      <small class="text-muted">{{templateOptions.description}}</small>
    </fieldset>`
})
export class AutoFormsFieldTextArea extends Field implements AfterViewInit {
    constructor(afm: AutoFormsMessages, afps: AutoFormsSubject, private  elem: ElementRef) {
        super(afm, afps);
    }
    ngAfterViewInit(): void {
        if (this.templateOptions.focus) {
            this.elem.nativeElement.querySelector("textarea").focus();
        }
    }
}
