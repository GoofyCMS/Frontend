import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {BaseService} from "../../base.service";

@Injectable()
export class ArticleService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "blog", "ArticleItem");
    }

    getArticles() {
        return this.getAll()
    }

}
