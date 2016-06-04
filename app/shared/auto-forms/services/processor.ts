import {AutoFormsFieldConfig} from "../components/field.config";

export interface AutoFormsConfigVisitor {
    visit(config: AutoFormsFieldConfig);
}

export class FormlyConfigProcessor {

    visitors: AutoFormsConfigVisitor [] = [new AutoFormsConfigValidator()];

    process(fieldConfigs: AutoFormsFieldConfig[]): void {
        fieldConfigs.forEach(field => {
            this.visitors.forEach(visitor => {
                visitor.visit(field);
            });
        });
    }
}

class AutoFormsConfigValidator implements  AutoFormsConfigVisitor {
    visit (field: AutoFormsFieldConfig) {}
}
