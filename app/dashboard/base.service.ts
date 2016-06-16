import {Component} from "@angular/core";

import {UnitOfWorkFactory, UnitOfWork} from "./../shared/services/unitofwork";
import {Datasource} from "./../shared/services/datasource";
import {Repository} from "./../shared/services/repository";

export class BaseService {
    protected _repo: Repository;
    protected _datasource: Datasource = null;

    constructor(private _uowf: UnitOfWorkFactory,
                protected _contextName: string,
                protected _entityType: string) {
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

    protected add(values: any): void {
        this._repo.add(values);
        this._repo.saveChanges();
    }

    protected remove(entity){
        this._repo.remove(entity);
        this._repo.saveChanges();
    }

    protected save(entities?:string): void {
        this._repo.saveChanges()
    }
    
    

}