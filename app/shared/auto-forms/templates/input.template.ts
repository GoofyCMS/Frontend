import {Component, ElementRef, AfterViewInit} from "@angular/core";
import {AutoFormsMessages, AutoFormsMessage} from "./../services/messages.service";
import {AutoFormsSubject} from "./../services/event-emitter.service";
import {Field} from "./field";

@Component({
    selector: "af-field-input",
    template: `
    <div class="form-group" [ngFormModel]="form" [ngClass]="{'has-danger': !formControl.valid}" *ngIf="!templateOptions.hidden">
      <label attr.for="{{key}}" class="form-control-label">{{templateOptions.label}}</label>
        <input type="{{templateOptions.type}}" [ngControl]="key" class="form-control" id="{{key}}"
          placeholder="{{templateOptions.placeholder}}" [disabled]="templateOptions.disabled"
          (keyup)="inputChange($event, 'value')" (change)="inputChange($event, 'value')"
          [ngClass]="{'form-control-danger': !form.controls[key].valid}">
        <small class="text-muted">{{templateOptions.description}}</small>
        <small class="text-muted text-danger"><formly-message [control]="key"></formly-message></small>
      </div>
    `,
    directives: [AutoFormsMessage],
})
export class AutoFormsFieldInput extends Field implements AfterViewInit {


    constructor(afm: AutoFormsMessages, afps: AutoFormsSubject, private elem: ElementRef) {
        super(afm, afps);
    }

    ngAfterViewInit(): void {
        if (this.templateOptions.focus) {
            this.elem.nativeElement.querySelector("input").focus();
        }
    }
}
