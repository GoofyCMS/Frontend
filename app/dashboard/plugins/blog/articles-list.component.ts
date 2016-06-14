import {Component, OnInit} from "@angular/core";
import {ArticleService} from "./article.service";
import {IArticle} from "../../../shared/models/article";
import {InputSwitch, Button} from "primeng/primeng";

@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [InputSwitch, Button],
    providers: [ArticleService],
})

export class ArticleListComponent implements OnInit {
    public _articles: IArticle[];

    constructor(private _articleService: ArticleService) {
    }

    public getArticles(): void {
        this._articles = [];

        this._articles = [];
        this._articleService.getArticles()
            .then(
                s=> {
                    this._articles = s.results;
                }
            );
    }

    public getArticle(id: number) {
        return this._articleService.getArticle(id);
    }

    ngOnInit(): void {
        this.getArticles();
    }
}
