import {AutoFormsConfig} from "../services/config.service";
import {AutoFormsMessages} from "../services/messages.service";
import {TemplateDirectives} from "./templates";
import {Injectable} from "@angular/core";

@Injectable()
export class AutoFormsBootstrap {
    constructor(afc: AutoFormsConfig, afm: AutoFormsMessages) {
        afm.addStringMessage("required", "This field is required.");
        afm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
        afm.addStringMessage("maxlength", "Maximum Length Exceeded.");
        afm.addStringMessage("minlength", "Should have at least 2 Characters");

        ["input", "checkbox", "radio", "select"].forEach(function (field) {
            afc.setType({
                name: field,
                component: TemplateDirectives[field],
            });
        });
    }
}