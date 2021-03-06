import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class UserClaimService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "IdentityUserClaimItem");
    }

    public getUserClaims() {
        return this.GetAll();
    }

    public addUserClaim(values: any): void {
        this.add(values);
    }

    public removeUserClaim(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        super.saveChanges();
    }
}

