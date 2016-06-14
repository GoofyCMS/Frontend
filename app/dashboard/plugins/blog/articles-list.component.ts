import {Component, OnInit} from "@angular/core";
import {ArticleService} from "./article.service";
import {IArticle} from "../../../shared/models/article";
import {InputSwitch, Button, DataList} from "primeng/primeng";

@Component({
    selector: "articles-list",
    templateUrl: "./app/dashboard/plugins/blog/articles-list.component.html",
    directives: [InputSwitch, Button,DataList],
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
    public _listToRemove: number[];
    public changeInput(e, id){
    //     if(_listToRemove.contains())
    }


    ngOnInit(): void {
        this._listToRemove = [];
        this.getArticles();
    }
}
