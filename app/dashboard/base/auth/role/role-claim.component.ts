import {Component, OnInit, ReflectiveInjector, Inject} from "@angular/core";
import {RoleClaimService} from "./role-claim.service";

@Component({
    selector: "role-claims",
    templateUrl: "./app/dashboard/base/auth/role/role-claim.component.html",
    providers: [RoleClaimService],
})
export class RoleClaimComponent implements OnInit {
    public _elems: any[];

    constructor(private _roleClaimService: RoleClaimService) {
    }

    public getRoleClaims(): void {
        this._elems= [];
        // this._roleClaimService.getRoleClaims()
        //     .then(
        //         s=> {
        //             this._elems= s.results;
        //         }
        //     );
    }

    ngOnInit(): void {
        this.getRoleClaims();
    }
}
