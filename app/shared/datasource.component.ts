import {Datasource} from "./services/datasource";
import {UnitOfWork} from "./services/unitofwork";

import {Logger} from "./resources/logger";
import {DataTableWrapper} from "./resources/datatable";

export class DatasourceComponent {

    datasource: Datasource;

    constructor(public router, public logger: Logger, public unitofwork: UnitOfWork, entityTypeName: string,
                public columns, public displayName: string, datasourceOptions?: any) {

        this.logger.logInfo(`Starting ${this.displayName} component`, null, this);

        if (datasourceOptions == null) {
            datasourceOptions = {};
        }
        this.datasource = new Datasource(
            this.unitofwork.getRepository(entityTypeName),
            {
                parameters: datasourceOptions.parameters,
                where: datasourceOptions.where,
                orderBy: datasourceOptions.orderBy,
                select: datasourceOptions.select,
                page: datasourceOptions.page || 1,
                count: datasourceOptions.count || 10}
        );

        router.subscribe(() => {
            debugger;
        });

    }

    navigateBack() {
        //return this.router.navigateByUrl(this.router.parent.lastNavigationAttempt);
    }

}
