import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class UserRoleService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "IdentityUserRoleItem");
    }

    public getUserRoles() {
        return this.GetAll();
    }

    public addUserRole(values: any): void {
        this.add(values);
    }

    public removeUserRole(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        this.save()
    }
}

