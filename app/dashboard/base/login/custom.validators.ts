import {Control} from "@angular/common";

export class CustomValidators {
    /*
     @method: validateEmail
     @descrip: Validate email with regex
     */
    public static validateEmail(control: Control): any {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return undefined;
        } else {
            return {"invalidEmailAddress": true};
        }
    }

}