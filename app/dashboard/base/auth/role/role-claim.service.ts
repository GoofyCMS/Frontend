import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class RoleClaimService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "IdentityRoleClaimItem");
    }

    public getRoleClaims() {
        return this.GetAll();
    }

    public addRoleClaim(values: any): void {
        this.add(values);
    }

    public removeRoleClaim(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        super.saveChanges();
    }
}

