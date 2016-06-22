import {Datasource} from '../services/datasource';
import {UnitOfWork, UnitOfWorkFactory} from '../services/unitofwork';
import {BaseComponent} from './base.component';
import {Logger} from '../resources/logger';
import EntityType = breeze.EntityType;
import {Inject, ReflectiveInjector} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {FormlyFieldConfig} from "../auto-forms/components/formly.field.config";
import DataProperty = breeze.DataProperty;
import NavigationProperty = breeze.NavigationProperty;


export class DataSourceComponent extends BaseComponent {
    datasource: Datasource;
    protected context: UnitOfWork;
    protected entityType: EntityType;
    public columns;
    public displayName: string;
    public keyFields: string[] = [];
    public keyFieldsDataSources: any[] = [];

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
        this.GetKeyFields();
        if (this.keyFieldsDataSources.length)
            this.keyFieldsDataSources.forEach(
                v => v.reload()
            );

    }

    public getDataSource(repo: string): Datasource {
        return new Datasource(this.context.getRepository(repo), {});
    }

    public GetKeyFields(): void {
        let props = this.GetNavigationProperties();

        for (let p = 0; p < props.length; p++) {
            this.keyFields.push(props[p].entityType.shortName);
            this.keyFieldsDataSources.push(this.getDataSource(props[p].entityType.shortName));
            this.keyFieldsDataSources[p].reload();
        }
    }

    public GetNavigationProperties() {
        return this.entityType.navigationProperties;
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

    private getControlType(p: DataProperty): any {
        let dataType = p.dataType.getName();
        if (dataType == 'String') {
            if (name == 'Password')
                return {fieldType: "password", controlType: "input"};
        }
        else if (p.dataType.isDate)
            return {fieldType: "datetime", controlType: "input"};
        else if (dataType == 'Boolean')
            return {fieldType: "", controlType: "toggle"};
        else if (p.dataType.isNumeric) {
            return {fieldType: "number", controlType: "input"};
        }
        else if (dataType == 'Boolean')
            return {fieldType: "", controlType: "toggle"};

        return {fieldType: "text", controlType: "input"};
    }

    private getConfig(p: DataProperty) {
        let config: FormlyFieldConfig;
        let types: any = this.getControlType(p);
        config = {
            type: types['controlType'],
            key: p.name,
            templateOptions: {
                label: p.nameOnServer,
                disabled: false,
                placeholder: p.nameOnServer
            }
        };

        if (types['fieldType'] != '')
            config.templateOptions.type = types['fieldType'];
        return config;
    }

    private getConfigSelect(p: NavigationProperty) {
        let config: FormlyFieldConfig;
        config = {
            type: 'select',
            key: p.name,
            templateOptions: {
                label: p.nameOnServer,
                disabled: false,
                placeholder: p.nameOnServer
            }
        };

        config.templateOptions.options = this.populateSelect(p.entityType.shortName);

        return config;
    }

    public getData(name) {
        for (let p = 0; p < this.keyFieldsDataSources.length; p++) {
            if (this.keyFieldsDataSources[p].entityType.shortName == name)
                return this.keyFieldsDataSources[p];
        }
    }

    private populateSelect(name) {
        let options = [{value: 0, label: 'nothing selected'}];

        // let data: Datasource = new Datasource(this.context.getRepository(name));
        let data: Datasource = this.getData(name);
        data.reload().then(()=>
            data.items
                .forEach(
                    e => options.push({value: e.id, label: e.id})
                ));
        return options;
    }

    public GetProperties() {
        //todo ver si esto es es lo mismo que this.entitytype.dataproperties
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

    public GetFieldsConfig(forbidden: string[] = ["Id"]) {
        let configs: FormlyFieldConfig[] = [];
        let props = this.GetProperties();
        let config = this.getConfig;

        let validProperties: DataProperty[] = [];
        props.forEach(p=> {
            if (!(forbidden.some(f => p.nameOnServer == f)))
                validProperties.push(p);
        });

        for (let a = 0; a < validProperties.length; a++)
            configs.push(this.getConfig(validProperties[a]));

        let navprops = this.GetNavigationProperties();
        for (let a = 0; a < navprops.length; a++)
            configs.push(this.getConfigSelect(navprops[a]));

        return configs;
    }


    private GetFields() {
        let props = this.GetProperties();
    }
}

