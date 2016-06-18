import {UnitOfWorkFactory, UnitOfWork} from "./../shared/services/unitofwork";
import {Datasource} from "./../shared/services/datasource";
import {Repository} from "./../shared/services/repository";
import {Logger} from "./../shared/resources/logger";

export class BaseService {
    protected _repo: Repository;
    public _datasource: Datasource = null;
    protected logger: Logger;

    constructor(private _uowf: UnitOfWorkFactory,
                protected _contextName: string,
                protected _entityType: string) {
        this.logger = new Logger();
        let context: UnitOfWork = this._uowf.getContext(this._contextName);
        this._repo = context.getRepository(this._entityType);
        this._datasource = new Datasource(this._repo);

    }

    protected GetAll() {
        return this._datasource.reload();
    }

    protected add(values: any) {
        this._datasource.add(values);
    }

    protected remove(entity) {
        // this._repo.remove(entity);
        // this._repo.saveChanges()
        //     .then(r => {
        //         this.GetAll();
        //     });
        this._datasource.remove(entity);
    }

    protected elems() {
        return this._datasource.items;
    }

    protected saveChanges(entities?: string): void {
        // this._repo.saveChanges().then(r => {
        //     this.GetAll();
        // });
        this._datasource.saveChanges()
            .then(() => {
                this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true);
                this._datasource.rejectChanges()
                    .then(()=>this._datasource.reload());
            })
            .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
    }

    protected registerContext(name: string) {
        this._uowf.configure([name])
            .then(
                r => {
                }
            );
    }


}