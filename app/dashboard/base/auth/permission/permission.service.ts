import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class PermissionService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "PermissionItem");
    }

    public GetAll() {
        return this.GetAll();
    }

    public addArticle(values: any): void {
        this._datasource.add(values);
    }

    public removeArticle(entity) {
        // this.remove(entity);
        this._datasource.remove(entity);
    }

    public saveChanges(entities?: string): void {
        this._datasource.saveChanges()
            .then(() => {
                this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true);
                this._datasource.rejectChanges()
                    .then(()=>this._datasource.reload());
            })
            .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
        // this._datasource.items.forEach( i => i.rejectChanges());
    }
}

