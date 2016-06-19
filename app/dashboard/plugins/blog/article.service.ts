import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {BaseService} from "../../base.service";

@Injectable()
export class ArticleService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "blog", "ArticleItem");

        setTimeout(()=> {
            this.getItems();
        });
    }

    public getItems() {
        return super.GetAll();
    }

    public addItem(values: any): void {
        super.add(values);
    }

    public items() {
        return this._datasource.items
    }

    public removeItem(entity) {
        super.remove(entity);
    }

    public saveChanges(entities?: string): void {
        super.saveChanges()
    }
}
