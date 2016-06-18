import {Injectable, Inject} from "@angular/core";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {BaseService} from "../../../base.service";

@Injectable()
export class UserService extends BaseService {

    constructor(@Inject(UnitOfWorkFactory) _uowf: UnitOfWorkFactory) {
        super(_uowf, "administration", "GoofyUserItem");
    }

    public getUsers() {
        return this.GetAll();
    }

    public addUser(values: any): void {
        this.add(values);
    }

    public removeUser(entity){
        this.remove(entity);
    }

    public saveChanges(entities?:string): void {
        this.save()
    }
}

