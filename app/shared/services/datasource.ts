/// <reference path="../../../typings/breeze/breeze.d.ts" />
import {Repository} from './repository';
import {Logger} from "../resources/logger";

export class Datasource {

    public parameters: any;
    public where: breeze.Predicate;
    public select: string;
    public orderBy: string;
    public page: number;
    public count: number;
    public items: Array<any>;
    public itemsCount: number;
    public isReloading: boolean;
    public logger: Logger;

    constructor(public repository: Repository | Array<any>,
        {parameters = null, where = null, orderBy = null, select = null, page = 1, count = 10} = {}) {
        this.parameters = parameters;
        this.where = where;
        this.orderBy = orderBy;
        this.select = select;
        this.page = page;
        this.count = count;
        this.items = [];
        this.itemsCount = 0;
        this.isReloading = false;

        this.logger = new Logger();
        if (typeof(repository)==typeof(Repository))this.repository.getAll();
    }

    get totalPages() {
        return Math.ceil(this.itemsCount / this.count);
    }

    get isArray() {
        return Array.isArray(this.repository);
    }

    get asRepository() {
        return <Repository>this.repository;
    }

    get asArray() {
        return <Array<any>>this.repository;
    }

    reload(fromCache: boolean = false) {
        if (this.isArray) {
            // TODO: apply filter and sort.
            let repository = this.asArray;
            this.items = repository.slice(this.page - 1, this.count);
            this.itemsCount = repository.length;
        } else {
            let repository: Repository = this.asRepository;
            return new Promise((resolve, reject) => {
                this.isReloading = true;
                return repository.getAll(this.parameters, this.where, this.orderBy, this.select, this.page - 1, this.count, fromCache)
                    .then(data => {
                        this.items = (<any>data).results;
                        this.itemsCount = (<any>data).inlineCount;
                        resolve(this);
                    }, error => reject(error))
                    .then(() => this.isReloading = false);
            });
        }
    }

    find(id, checkLocalCacheFirst: boolean = false): breeze.promises.IPromise<any> {
        if (this.isArray) {
            // TODO: Key field is hard-coded to id, must find better way of resolving this.
            //return getArray(this.repository).filter(item => item.id === id);
        }
        return this.asRepository.find(id, checkLocalCacheFirst);
    }

    add(values = null): Promise<any> {
        if (this.isArray) {

        }
        return new Promise((resolve, reject) => {
            let newItem = this.asRepository.add(values);
            this.reload(true).then(() => resolve(newItem));
        });
    }

    remove(entity) {
        if (this.isArray) {

        }
        return new Promise((resolve, reject) => {
            this.asRepository.remove(entity);
            this.reload(true).then(() => resolve(entity));
        });
    }

    removeAll(entities) {
        if (this.isArray) {

        }
        return new Promise((resolve, reject) => {
            var removed = [];
            for (let entity of entities) {
                removed.push(this.asRepository.remove(entity));
            }
            this.reload(true).then(() => resolve(removed));
        });
    }

    saveChanges(entities?: any) {
        if (this.isArray) return new Promise((resolve) => resolve(true));
        return this.asRepository.saveChanges(entities)
            .then(
                ()=>this.rejectChanges()
                    .then(
                        ()=>this.reload()
                            .then(
                                ()=> this.logger.logSuccess('Success!', 'All data reloaded!', null, this, true)
                            )
                    )
            );

        // return saveResult;
    }

    rejectChanges(entities?: any) {
        if (this.isArray) return new Promise((resolve) => resolve(true));
        return new Promise((resolve, reject) => {
            var removed = this.asRepository.unitofwork.rejectChanges(entities);
            resolve(removed);
        });
    }

    moveFirstPage() {
        this.moveToPage(1);
    }

    movePreviousPage() {
        this.moveToPage(this.page - 1);
    }

    moveNextPage() {
        this.moveToPage(this.page * 1 + 1);
    }

    moveToPage(value) {
        if (value > this.totalPages) {
            this.page = this.totalPages;
        } else if (value < 1) {
            this.page = 1;
        } else if (this.page != value) {
            this.page = value;
        }
        this.reload();
    }

    moveLastPage() {
        this.moveToPage(this.totalPages);
    }

    enterPage(event) {
        if (event.which == 13) {
            return this.reload();
        }
    }

}