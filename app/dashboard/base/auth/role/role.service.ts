import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class RoleService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "GoofyRoleItem");
    }

    public getRoles() {
        return this.GetAll();
    }

    public addRole(values: any): void {
        this.add(values);
    }

    public removeRole(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        super.saveChanges();
    }
}

