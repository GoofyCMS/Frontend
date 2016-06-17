import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {UserClaimService} from "./user-claim.service";

@Component({
    selector: "user-claims",
    templateUrl: "./app/dashboard/base/auth/user/user-claims.component.html",
    providers: [UserClaimService],
})
export class UserClaimComponent implements OnInit {
    public _elems: any[];

    constructor(private _userClaimService: UserClaimService) {
    }

    public getUserClaims(): void {
        this._elems= [];
        this._userClaimService.getUserClaims()
            .then(
                s=> {
                    this._elems= s.results;
                }
            );
    }

    ngOnInit(): void {
        this.getUserClaims();
    }
}
