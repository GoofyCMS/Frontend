import {Injectable, Component, Host, Input} from "angular2/core";
import {NgFormModel, AbstractControl} from "angular2/common";

@Injectable()
export class AutoFormsMessages {
    private _messages: any = {};

    constructor() {
    }

    public addStringMessage(validator: string, message: string): void {
        this._messages[validator] = message;
    }

    public getMessages(): any {
        return this._messages;
    }

    public getValidatorErrorMessage(prop: string): string {
        return this._messages[prop];
    }
}

@Component({
    selector: "af-message",
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
})
export class AutoFormsMessage {
    @Input() private _control: string;

    constructor(@Host() private _formDir: NgFormModel, protected afm: AutoFormsMessages) {
    }

    get errorMessage(): any {
        let c: AbstractControl = this._formDir.form.find(this._control);

        for (let propertyName in c.errors) {
            if (c.errors.hasOwnProperty(propertyName)) {
                return this.afm.getValidatorErrorMessage(propertyName);
            }
        }

        return undefined;
    }
}
