import {Component, OnInit,} from "@angular/core";
import {ArticleService} from "./article.service";
import {InputSwitch, Button} from "primeng/primeng";

@Component({
    selector: "articles-list",
    templateUrl: "./app/public_site/plugins/blog/articles-list.component.html",
    styleUrls: ["./app/public_site/plugins/blog/articles-list.component.css"],
    directives: [InputSwitch, Button],
    providers: [ArticleService],
})

export class ArticleListComponent implements OnInit {
    private _articles;

    constructor(private _articleService: ArticleService) {
    }

    public getItems() {
        this._articleService.getItems()
            .then(
                res=> this._articles = res.results
            );
    }

    ngOnInit(): void {
        this.getItems();
    }
}
