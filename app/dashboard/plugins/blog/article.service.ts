import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../shared/services/unitofwork";
import {BaseService} from "../../base.service";

@Injectable()
export class ArticleService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "blog", "ArticleItem");
    }

    public getArticles() {
        return this.getAll();
    }

    public addArticle(values: any): void {
        this.add(values);
    }

    public removeArticle(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        this.save()
    }
}
