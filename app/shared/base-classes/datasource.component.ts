import {Datasource} from '../services/datasource';
import {UnitOfWork, UnitOfWorkFactory} from '../services/unitofwork';
import {BaseComponent} from './base.component';
import {Logger} from '../resources/logger';
import EntityType = breeze.EntityType;
import {Inject, ReflectiveInjector} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {FormlyFieldConfig} from "../auto-forms/components/formly.field.config";


export class DataSourceComponent extends BaseComponent {
    datasource: Datasource;
    protected context: UnitOfWork;
    protected entityType: EntityType;
    public columns;
    public displayName: string;

    constructor(protected _uowf: UnitOfWorkFactory,
                logger: Logger,
                protected router: Router,
                private _contextName: string,
                private _entityTypeName: string,
                datasourceOptions?: any) {
        super(logger);

        this.logger.logInfo(`Starting ${this.displayName} component`, null, this);

        if (datasourceOptions == null) {
            datasourceOptions = {};
        }

        this.context = this._uowf.getContext(this._contextName);
        this.datasource = new Datasource(this.context.getRepository(this._entityTypeName), datasourceOptions);
        this.router.subscribe(() => {
            debugger;
        });

        this.GetColumns();
    }

    private GetColumns() {
        let props = this.GetProperties();
        this.columns = [];
        props.forEach(
            prop => {
                this.columns.push({header: prop.nameOnServer, field: prop.name, sortable: true})
            }
        )
    }

    private GetFields() {
        let props = this.GetProperties();

    }

    private getType(name, flags): string {
        let ftype = "text";

        if (name == 'Password')
            ftype = 'password';
        else if (flags[0])
            ftype = 'text';

        return ftype;
    }

    private getControlType(name, flags) {
        return flags[1] ? 'select' : 'input'
    }

    public GetFieldsConfig() {
        let configs: FormlyFieldConfig[] = [];
        let config: FormlyFieldConfig;
        let props = this.GetProperties();

        let ffc: FormlyFieldConfig = {
            type: "input",
            key: "content",
            templateOptions: {
                type: "text",
                label: "Content",
                disabled: false,
                placeholder: "content",
            }
        };

        let ftype = this.getType;
        let ctrlType = this.getControlType;

        props.forEach(p=> {
            config = {
                type: ctrlType(p.nameOnServer, [p.isNullable, p.isNavigationProperty]),
                key: p.name,
                templateOptions: {
                    type: ftype(p.nameOnServer, [p.isNullable, p.isNavigationProperty]),
                    label: p.nameOnServer,
                    disabled: false,
                    placeholder: p.nameOnServer
                }
            };
            configs.push(config);
        });

        return configs;
    }

    public GetProperties() {
        this.context.entityTypes
            .forEach(
                e=> {
                    if (e.shortName == this._entityTypeName) {
                        this.entityType = e;
                        this.displayName = this.entityType.defaultResourceName;
                    }
                }
            );

        return this.entityType.dataProperties;
    }

}

