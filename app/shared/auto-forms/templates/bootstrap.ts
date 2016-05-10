import {AutoFormsConfig} from "../services/config.service";
import {AutoFormsMessages} from "../services/messages.service";
import {TemplateDirectives} from "./templates";
import {Injectable} from "@angular/core";

@Injectable()
export class AutoFormsBootstrap {
    constructor(fc: AutoFormsConfig, fm: AutoFormsMessages) {
        fm.addStringMessage("required", "This field is required.");
        fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        fm.addStringMessage("minlength", "Should have at least 2 Characters");

        ["input", "checkbox", "radio", "select"].forEach(function (field) {
            fc.setType({
                name: field,
                component: TemplateDirectives[field],
            });
        });
    }
}