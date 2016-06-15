import {Component, OnInit} from "@angular/core";
import {ArticleService} from "./article.service";
import {IArticle} from "../../../shared/models/article";
import {InputSwitch, Button} from "primeng/primeng";
import {DataTableWrapper} from "../../../shared/resources/datatable";


@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [InputSwitch, Button],
    providers: [ArticleService],
})

export class ArticleListComponent implements OnInit {
    public _articles: any;

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

    public _listToRemove: number[];

    public changeInput(e, id) {
        //     if(_listToRemove.contains())
    }

    public removeArticle() {
        this._articleService.delete(this._articles.pop());
        this._articleService.save();
    }

    ngOnInit(): void {
        this._listToRemove = [];
        this.getArticles();
    }
}
