import {
    Component,
    OnInit,
    DoCheck,
    Input,
    Output,
    EventEmitter,
    DynamicComponentLoader,
    ViewContainerRef,
    ViewChild,
} from "angular2/core";

import {AutoFormsBaseComponent} from "./base.component";
import {AutoFormsConfig} from "../services/config.service";
import {AutoFormsEventEmitter, AutoFormsSubject} from "../services/event-emitter.service";

@Component({
    selector: "af-field",
    template: `
        <div #child></div>
        <div *ngIf="field.template" [innerHtml]="field.template"></div>
         <div class="af-field"
            *ngFor="#f of field.fieldGroup">
            <af-field 
                [hide]="f.hideExpression" 
                [model]="model" 
                [key]="f.key" 
                [form]="form" 
                [field]="f" 
                (changeFn)="changeFunction($event, f)" 
                [ngClass]="f.className" 
                [eventEmitter]="eventEmitter">
            </af-field>
        </div> 
    `,
    directives: [AutoFormsField],
})
export class AutoFormsField extends AutoFormsBaseComponent implements OnInit, DoCheck {
    @Input() model;
    @Input() key;
    @Input() form;
    @Input() field;
    @Input() eventEmitter;

    @Output() changeFn: EventEmitter<any> = new EventEmitter();

    @ViewChild("child") private elem: ViewContainerRef;

    // locals
    directives;
    hide;
    update;

    constructor(protected dcl: DynamicComponentLoader,
                afc: AutoFormsConfig,
                protected afsub: AutoFormsSubject) {
        super();
        this.directives = afc.getDirectives();
    }

    ngOnInit() {
        this.hide = !!this.field.hideExpression;

        if (!!this.field.hideExpression || this.field.hideExpression === undefined && !this.field.template && !this.field.fieldGroup) {
            this.update = new AutoFormsEventEmitter();
            this.afsub.setEmitter(this.key, this.update);
            // TODO: fix this. read the changelog
            this.dcl.loadNextToLocation(this.directives[this.field.type], this.elem).then(ref => {
                ref.instance.model = this.model[this.field.key];
                ref.instance.type = this.field.type;
                ref.instance.options = this.field.templateOtions;
                ref.instance.changeFn.subscribe((value) => {
                    this.changeFn.emit(value);
                });
                ref.instance.key = this.key;
                ref.instance.form = this.form;
                ref.instance.update = this.update;
            });
        }
    }

    toggleFn(cond): void {
        this.elem.element.nativeElement.style.display = cond ? "" : "none";
        if (this.field.fieldGroup) {
            for (let i = 0; i < this.field.fieldGroup.length; i++) {
                this.afsub.getEmitter([this.field.fieldGroup[i].key]).emit({
                    key: "hidden",
                    value: !cond,
                });
            }
        } else {
            this.afsub.getEmitter(this.field.key).emit({
                key: this.field.key,
                value: !cond,
            });
        }
    }

    ngDoCheck(): void {
        if (this.field.hideExpression !== undefined && this.field.hideExpression !== this.hide) {
            this.hide = this.field.hideExpression;
            if (this.hide) {
                this.toggleFn(false);
            } else {
                this.toggleFn(true);
            }
        }
    }

}