import {
    Component, OnInit, Input, Output, EventEmitter, ElementRef,
    ViewContainerRef, ViewChild, DoCheck, Directive, ComponentFactory, ComponentResolver
} from "@angular/core";
import {AutoFormsBaseComponent} from "./base.component";
import {AutoFormsConfig} from "../services/config.service";
import {AutoFormsEventEmitter, AutoFormsSubject} from "../services/event-emitter.service";
import {AutoFormsFieldVisibilityDelegate, AutoFormsFieldExpressionDelegate} from "../services/field.delegates";
import {AutoFormsFieldConfig} from "./field.config";

@Directive({
    selector: "[child-host]"
})
export class DivComponent {
    constructor(public viewContainer: ViewContainerRef) { }
}

@Component({
    selector: "af-field",
    template: `
        <div child-host #child></div>
        <div *ngIf="field.template" [innerHtml]="field.template"></div>
        <div class="formly-field"
          *ngFor="let field of field.fieldGroup">
          <formly-field [hide]="field.hideExpression" [model]="model" [key]="field.key" [form]="form" [field]="field"
            (changeFn)="changeFunction($event, field)" [ngClass]="field.className" [eventEmitter]="eventEmitter">
          </formly-field>
        </div> 
    `,
    directives: [AutoFormsField, DivComponent]
})
export class AutoFormsField extends AutoFormsBaseComponent implements DoCheck, OnInit {

    // Inputs and Outputs
    @Input() model;
    @Input() key;
    @Input() form;
    @Input() field: AutoFormsFieldConfig;
    @Input() eventEmitter;

    // Outputs
    @Output() changeFn: EventEmitter<any> = new EventEmitter();

    // Local Variables
    directives;
    hide;
    update;
    visibilityDelegate: AutoFormsFieldVisibilityDelegate;
    expressionDelegate: AutoFormsFieldExpressionDelegate;

    @ViewChild(DivComponent) myChild: DivComponent;

    constructor(protected elem: ElementRef, afc: AutoFormsConfig, protected afps: AutoFormsSubject, protected cr: ComponentResolver) {
        super();
        this.directives = afc.getDirectives();
        this.visibilityDelegate = new AutoFormsFieldVisibilityDelegate(this);
        this.expressionDelegate = new AutoFormsFieldExpressionDelegate(this);
    }

    ngOnInit(): any {
        this.createChilds();
    }

    ngAfterViewInit() {}

    createChilds() {
        // TODO support this.formlyField.field.hideExpression as a callback/observable
        this.hide = this.field.hideExpression ? true : false;
        if (!this.field.template && !this.field.fieldGroup) {
            this.update = new AutoFormsEventEmitter();
            this.afps.setEmitter(this.key, this.update);
            this.cr.resolveComponent(this.directives[this.field.type])
                .then((cf: ComponentFactory<any>) => {
                    let ref = this.myChild.viewContainer.createComponent(cf);
                    ref.instance.model = this.model[this.field.key];
                    ref.instance.type = this.field.type;
                    ref.instance.templateOptions = this.field.templateOptions;
                    ref.instance.changeFn.subscribe((value) => {
                        this.changeFn.emit(value);
                    });
                    ref.instance.key = this.key;
                    ref.instance.form = this.form;
                    ref.instance.update = this.update;
                    ref.instance.field = this.field;
                    this.form.addControl(this.key, ref.instance.formControl);
                });
        }
    }

    isHidden() {
        return this.hide;
    }
    setHidden(cond: boolean) {
        this.hide = cond;

        this.elem.nativeElement.style.display = cond ? "none" : "";
        if (this.field.fieldGroup) {
            for (let i = 0; i < this.field.fieldGroup.length; i++) {
                this.psEmit(this.field.fieldGroup[i].key, "hidden", this.hide);
            }
        } else {
            this.psEmit(this.field.key, "hidden", this.hide);
        }
        this.eventEmitter.emit({
            key: this.field.key,
            value: this.hide
        });
    }
    ngDoCheck() {
        this.visibilityDelegate.checkVisibilityChange();
        this.expressionDelegate.checkExpressionChange();
    }
    private psEmit(fieldKey: string, eventKey: string, value: any) {
        if (this.afps && this.afps.getEmitter(fieldKey) && this.afps.getEmitter(fieldKey).emit) {
            this.afps.getEmitter(fieldKey).emit({
                key: eventKey,
                value: value
            });
        }
    }
}
