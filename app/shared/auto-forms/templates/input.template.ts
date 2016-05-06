import {Component, ElementRef, OnInit, AfterContentInit, AfterViewInit} from "angular2/core";
import {AutoFormsMessages, AutoFormsMessage} from "./../services/messages.service.ts";
import {AutoFormsSubject} from "./../services/event-emitter.service";
import {Field} from "./field";

@Component({
    selector: "af-field-input",
    template: `
        <div class="form-group" [ngFormModel]="form" [ngClass]="{'has-danger': !form.controls[key].valid}">
            <label attr.for="{{key}}" class="form-control-label">{{options.label}}</label>
            <input type="{{options.type}}" 
                [ngControl]="key" 
                class="form-control" 
                id="{{key}}" 
                placeholder="{{options.placeholder}}" 
                [disabled]="options.disabled" 
                (keyup)="inputChange($event, 'value')" 
                (change)="inputChange($event, 'value')" 
                *ngIf="!options.hidden" 
                [ngClass]="{'form-control-danger': !form.controls[key].valid}">
            <small class="text-muted">{{options.description}}</small>
            <small class="text-muted text-danger"><af-message [control]="key"></af-message></small>
        </div>
    `,
    directives: [AutoFormsMessage],
})
export class AutoFormsFieldInput extends Field implements AfterViewInit {


    constructor(afm: AutoFormsMessages, afs: AutoFormsSubject, private elem: ElementRef) {
        super(afm, afs);
    }

    ngAfterViewInit(): void {
        if (this.options.focus) {
            this.elem.nativeElement.querySelector("input").focus();
        }
    }
}
