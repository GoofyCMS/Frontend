import {Datasource} from '../services/datasource';
import {UnitOfWork, UnitOfWorkFactory} from '../services/unitofwork';
import {BaseComponent} from './base.component';
import {Logger} from '../resources/logger';
import EntityType = breeze.EntityType;
import {Inject, ReflectiveInjector} from "@angular/core";
import {Router} from "@angular/router-deprecated";


export class DataSourceComponent extends BaseComponent {
    datasource: Datasource;
    protected context: UnitOfWork;
    protected entityType: EntityType;
    public columns;
    public displayName: string;

    constructor(protected _uowf: UnitOfWorkFactory,
                protected logger: Logger,
                protected router: Router,
                private _contextName: string,
                private _entityTypeName: string,
                datasourceOptions?: any) {
        super();

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

