import {Component} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {NavbarComponent} from "./base/navbar/navbar.component";
import {HomeComponent} from "./base/home/home.component";


import {ArticleListComponent} from "./plugins/blog/articles-list.component";

@Component({
    selector: "public-site",
    styleUrls: ["./app/public_site/public_site.component.css"],
    templateUrl: "./app/public_site/public_site.component.html",
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, RouterLink, NavbarComponent],
})
@RouteConfig([
    {path: "/", as: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/articles", as: "ArticlesList", component: ArticleListComponent},
    {path: "/dashboard/**", redirectTo: ["GoofyDashboard"]},
    {path: "/**", redirectTo: ["Home"]},
])
export class PublicSiteComponent {

}


