export interface AutoFormsFieldConfig {
    key?: string;
    templateOptions?: AutoFormsTemplateOptions;
    validation?: any;
    template?: string;
    fieldGroup?: Array<AutoFormsFieldConfig>;
    hideExpression?: boolean | string | (() => boolean);
    className?: string;
    type?: string;
    expressionProperties?: any;
    focus?: boolean;
}

export interface AutoFormsTemplateOptions {
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: Boolean;
    options?: Array<any>;
    rows?: number;
    cols?: number;
    description?: string;
    focus?: boolean;
    hidden?: boolean;
}
