import {Component} from "@angular/core";
import {Field} from "./field";
import {AutoFormsMessages} from "./../services/messages.service.ts";
import {AutoFormsSubject} from "./../services/event-emitter.service";

@Component({
    selector: "af-field-checkbox",
    template: `
      <div class="form-group">
          <div [ngFormModel]="form">
              <label class="c-input c-checkbox">
                  <input type="checkbox" [ngControl]="key" (change)="inputChange($event, 'checked')" value="on"> {{options.label}}
                  <span class="c-indicator"></span>
              </label>
          </div>
          <small class="text-muted">{{options.description}}</small>
      </div>
    `,
})
export class AutoFormsFieldCheckbox extends Field {

    constructor(afm: AutoFormsMessages, afs: AutoFormsSubject) {
        super(afm, afs);
    }

}
