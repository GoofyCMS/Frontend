import {Component, OnInit} from "@angular/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup} from "@angular/common";

@Component({
    selector: "main-content",
    templateUrl: "./app/dashboard/base/mainContent/mainContent.html",
    styleUrls: ["./app/dashboard/base/mainContent/mainContent.css"],
    directives: [FORM_DIRECTIVES],
})
export class MainContentComponent implements OnInit {
    private _formTest: string;
    private myForm: ControlGroup;

    ngOnInit(): void {
        this._formTest = `
             {
  "entities": {
    "Login": {
      "Email": {
        "validations": [
          "required"
        ],
        "data_type": "email"
      },
      "Password": {
        "validations": [
          "required"
        ],
        "data_type": "password"
      }
    },
    "Register": {
      "Email": {
        "validations": [
          "required"
        ],
        "data_type": "email"
      },
      "Password": {
        "validations": [
          "required",
          "max_length_100",
          "min_length_6"
        ],
        "data_type": "password"
      }
    }
  }           
        `;

        this.myForm = this._fb.group({
            "sku": ["ABC123"],
        });
    }

    constructor(public _fb: FormBuilder) {

    }

    onSubmit(value: string): void {
        console.log("form value is: ", value);
    }
}