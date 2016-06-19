import {Injectable} from "@angular/core";
import {ARTICLES} from "../../../shared/mocks/mock-articles";
import {Observable} from "rxjs/rx";

@Injectable()
export class ArticleService {
    getArticles(){
        // return Observable.from(ARTICLES);
    }

    getArticle(id: number) {
        // return Observable.from(ARTICLES)
        //     .filter(s => s.id === id)
        //     .subscribe();
    }
}
