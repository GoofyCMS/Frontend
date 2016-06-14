import {Injectable, Inject} from "@angular/core";
import {ARTICLES} from "../../../shared/mocks/mock-articles";
import {Observable} from "rxjs/rx";
import {Repository} from "../../../shared/services/repository";
import {Datasource} from "../../../shared/services/datasource";
import {UnitOfWorkFactory, UnitOfWork} from "../../../shared/services/unitofwork";

@Injectable()
export class ArticleService {
    private _logger;
    private _repo: Repository;
    private _datasource: Datasource = null;

    constructor(@Inject(UnitOfWorkFactory) private _uowf: UnitOfWorkFactory) {
        let blogContext: UnitOfWork = this._uowf.getContext("blog");
        this._repo = blogContext.getRepository('ArticleItem');
        this._repo.add({content: 'aaaaaa'});
        this._repo.saveChanges();
        this._datasource = new Datasource(this._repo);
    }

    getArticles(){
        return this._repo.getAll();

    }

    getArticle(id: number) {
        // return Observable.from(ARTICLES)
        //     .filter(s => s.id === id)
        //     .subscribe();
    }
}
