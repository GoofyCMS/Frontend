/// <reference path="../../../typings/breeze/breeze.d.ts" />
import {UnitOfWork} from './unitofwork';
import {Logger} from '../resources/logger';
import FilterQueryOp = breeze.FilterQueryOp;

export class Repository {

    private failFunction = (e) => this.logger.logError('Error!', `Failed to read from server: ${e.status} ${e.statusText || e.message}`, e, this, true);

    constructor(public unitofwork: UnitOfWork, public entityTypeName: string, public logger: Logger, public fetchStrategy = breeze.FetchStrategy.FromServer) {
    }

    commit() {
        return this.unitofwork.saveChanges();
    }

    find(keys, checkLocalCacheFirst = false): breeze.promises.IPromise<any> {
        return this.unitofwork.manager.fetchEntityByKey(this.entityTypeName, keys, checkLocalCacheFirst)
            .then(data => {
                if (!data.entity)
                    throw new Error("Entity not found!");
                return data.entity;
            })
            .catch(this.failFunction);
    }

    getAll(parameters?: any, where?: breeze.Predicate, orderBy?: string, select?: string, page: number = 0, count: number = 10, fromLocalCache: boolean = false): breeze.promises.IPromise<breeze.QueryResult> {
        let query = breeze.EntityQuery.from(this.entityType.defaultResourceName);

        // if (parameters) {
        //     query = query.withParameters(parameters);
        // }
        //
        // if (where) {
        //
        // }
        // query = query.where('name', FilterQueryOp.Equals, 'bazinga');
        //
        // if (!orderBy) {
        //     orderBy = 'id';
        // }
        // query = query.orderBy(orderBy);
        //
        // if (select) {
        //     query = query.select(select);
        //     query = query.toType(this.entityTypeName);
        // }
        //
        // query = query
        //     .skip(page * count)
        //     .take(count)
        //     .inlineCount();

        if (fromLocalCache) {
            return (<breeze.promises.IPromise<breeze.QueryResult>>new Promise((resolve, reject) => {
                query = query.toType(this.entityTypeName);
                let result = this.unitofwork.manager.executeQueryLocally(query);
                resolve(<breeze.QueryResult>({
                    results: result,
                    inlineCount: result.length,
                    query: query,
                    httpResponse: null,
                    entityManager: this.unitofwork.manager
                }));
            }));
        } else {
            return this.unitofwork.manager.executeQuery(query.using(this.fetchStrategy), null, this.failFunction);
        }
    }

    add(values) {
        return this.unitofwork.manager.createEntity(this.entityTypeName, values);
    }

    removeEntity(entity){
        if (entity.isDeleted != null)
            entity.isDeleted = true;
        else
            entity.entityAspect.setDeleted();
    }

    remove(entity) {
        if (Array.isArray(entity))
            for (let e of entity)
                this.removeEntity(e);
        else
            this.removeEntity(entity);
        // if(Array.isArray(entity)){
        //     for (let e of entity){
        //         e.remove();
        //     }
        // } else {
        //     entity.remove();
            //debugger
            //let etype = entity.entityAspect.entityGroup.entityType.shortName;
            //this.unitofwork.getRepository(etype).remove(entity);

        // }
    }

    saveChanges(entities?: any, endPoint: string = '/save') {
        return this.unitofwork.saveChanges(entities, this.entityType.defaultResourceName + endPoint);
    }

    rejectChanges(entities?: any) {
        if(entities) {
            return this.unitofwork.rejectChanges(entities);
        }
        else {
            this.getAll(null, null, null, null, 0, 1000, true)
                .then(data => {
                    if((<any>data).inlineCount){
                        this.unitofwork.rejectChanges((<any>data).results)
                    }
                });
        }
    }

    get entityType(): breeze.EntityType {
        return <breeze.EntityType>this.unitofwork.manager.metadataStore.getEntityType(this.entityTypeName);
    }

}