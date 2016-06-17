import {Component} from "@angular/core";

import {UnitOfWorkFactory, UnitOfWork} from "./../shared/services/unitofwork";
import {Datasource} from "./../shared/services/datasource";
import {Repository} from "./../shared/services/repository";
import {Logger} from "./../shared/resources/logger";

export class BaseService {
    protected _repo: Repository;
    public _datasource: Datasource = null;
    protected logger: Logger;

    constructor(private _uowf: UnitOfWorkFactory,
                protected _contextName: string,
                protected _entityType: string) {
        this.logger = new Logger();
        let context: UnitOfWork = this._uowf.getContext(this._contextName);
        this._repo = context.getRepository(this._entityType);
        this._datasource = new Datasource(this._repo);

    }

    protected getAll() {
        return this._repo.getAll();
    }
    
    protected registerContext(name:string){
        this._uowf.configure([name]).then(
            r => {}
        );
    }

    protected add(values: any) {
        // return this._repo.add(values);
        // this._repo.saveChanges();
        this._datasource.add(values);
    }

    protected remove(entity){
        this._repo.remove(entity);
        this._repo.saveChanges().then(r =>{
            this.getAll();
        });
    }

    protected save(entities?:string): void {
        this._repo.saveChanges().then(r =>{
            this.getAll();
        });
    }
    
    

}