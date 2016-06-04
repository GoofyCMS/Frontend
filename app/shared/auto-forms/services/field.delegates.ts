import {AutoFormsField} from "../components/field.component";
import {evalExpression, expressionValueSetter} from "./expression";

export class AutoFormsFieldVisibilityDelegate {

    constructor(private autoFormsField: AutoFormsField) {

    }

    eval(expression: string | Function | boolean): boolean {
        // TODO support this.formlyField.field.hideExpression as a observable
        if (expression instanceof Function) {
            return expression();
        } else if (typeof expression === "string") {
            return evalExpression(expression, this.autoFormsField, ["model", "fieldModel"], [this.autoFormsField.model, this.autoFormsField.model[this.autoFormsField.key]]);
        } else {
            return expression ? true : false;
        }
    }

    hasHideExpression(): boolean {
        return (this.autoFormsField.field.hideExpression !== undefined) && this.autoFormsField.field.hideExpression ? true : false;
    }

    checkVisibilityChange() {
        let hideExpressionResult: boolean = this.eval(this.autoFormsField.field.hideExpression);
        if (hideExpressionResult !== this.autoFormsField.isHidden()) {
            this.autoFormsField.setHidden(hideExpressionResult);
        }
    }
}

export class AutoFormsFieldExpressionDelegate {
    constructor(private autoFormField: AutoFormsField) {

    }

    checkExpressionChange() {
        let expressionProperties = this.autoFormField.field.expressionProperties;

        if (expressionProperties) {
            for (let key in expressionProperties) {
                let expressionValue = evalExpression(expressionProperties[key], this.autoFormField, ["model", "fieldModel"], [this.autoFormField.model, this.autoFormField.model[this.autoFormField.key]]);
                expressionValueSetter(key, expressionValue, this.autoFormField
                    , ["model", "fieldModel", "templateOptions"]
                    , [this.autoFormField.model, this.autoFormField.model[this.autoFormField.key], this.autoFormField.field.templateOptions]);
            }
        }
    }
}
