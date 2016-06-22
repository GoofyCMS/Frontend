import {Injectable, Inject} from "@angular/core";
import {ARTICLES} from "../../../shared/mocks/mock-articles";
import {Observable} from "rxjs/rx";
import {BaseService} from "../../../dashboard/base.service";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";

@Injectable()
export class ArticleService extends BaseService {
    

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "blogPublic", "ArticleItem");

    }

    public getItems() {
        return this._repo.getAll();
    }
}
