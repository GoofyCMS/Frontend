import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class PermissionService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "PermissionItem");
    }

    public getPermissions() {
        return this.getAll();
    }

    public addPermission(values: any): void {
        this.add(values);
    }

    public removePermission(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        this.save()
    }
}

