import {Component, OnInit, Input} from "@angular/core";
import {ControlGroup, NgFormModel, FormBuilder} from "@angular/common";
import {AutoFormsField} from "./field.component";
import {AutoFormsEventEmitter, AutoFormsSubject} from "./../services/event-emitter.service";
import {AutoFormsBaseComponent} from "./base.component";
import {AutoFormsFieldConfig} from "./field.config";

@Component({
    selector: "af-form",
    directives: [AutoFormsField],
    template: `
            <form class="formly" role="form" novalidate [ngFormModel]="form">
              <div class="formly-field"
                  *ngFor="let field of fields"
                  [ngClass]="field.className">
                  <formly-field [hide]="field.hideExpression" [model]="model" [key]="field.key" [form]="form" [field]="field"
                    (changeFn)="changeFunction($event, field)" [eventEmitter]="event">
                  </formly-field>
              </div>
              <ng-content></ng-content>
            </form>
            `,
    providers: [NgFormModel, AutoFormsSubject]
})
export class AutoFormsFormComponent extends AutoFormsBaseComponent implements OnInit {
    // Inputs
    @Input()
    public get fields(): AutoFormsFieldConfig[] {
        return this._fields;
    }

    public set fields(value) {
        this._fields = value;
        this.afps.Stream.emit(this.form);
    }
    @Input()
    public get model() {
        return this._model;
    };

    public set model(value) {
        this._model = value;
        this.afps.Stream.emit(this.form);
    }

    // Local Variables
    @Input() form: ControlGroup;
    event;
    private _model;
    private _fields: AutoFormsFieldConfig[];

    constructor(private _fm: NgFormModel, private afps: AutoFormsSubject, private fb: FormBuilder) {
        super();
        this.event = new AutoFormsEventEmitter();
    }
    ngOnInit() {
        if (!this._model) {
            this._model = {};
        }
        this.form = this.fb.group({});
    }
    changeFunction(value, field) {
        this._model[field.key] = value;
        this.formSubmit.emit(value);
    }
}