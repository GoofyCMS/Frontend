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
    public _selectedList: number[];

    public changeInput(e, article) {
        // if (this.isSelected(article.id))
        //      this._selectedList.remove(article.id);
        // else
            this._selectedList.push(article.id);
    }
    
    public addArticle(){
        this._articleService.addArticle([{content: "article of " + Date.now()}]);
    }

    public isSelected(id) {
        this._selectedList.forEach(a => {
            if (a == id)
                return true
        });
        return false;
    }

    public editArticle() {
        this._articles[0].content = this._articles[0].content + " edited";
        this._articleService.saveChanges();
    }

    public removeArticle() {
        this._articleService.removeArticle(this._articles.pop());
    }

    ngOnInit(): void {
        this._listToRemove = [];
        this._selectedList = [];
        this.getArticles();
    }
}
