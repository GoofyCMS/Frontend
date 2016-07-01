/// <reference path="../../../typings/breeze/breeze.d.ts" />
/// <reference path="../../../typings/es6-shim/es6-shim.d.ts" />
import {Injector} from '@angular/core';
import {Logger} from "../resources/logger";
import {Repository} from "./repository";
import {EventAggregator} from "./event-aggregator";
import * as moment from "moment";

export class UnitOfWorkFactory {

    public injector: Injector;

    constructor(private logger: Logger, private eventAggregator: EventAggregator) {
        breeze.NamingConvention.camelCase.setAsDefault();
    }

    private contexts: Map<string, EntityManagerProvider> = new Map<string, EntityManagerProvider>();

    configure(modules) {
        let promises = [];
        modules.forEach(m => {
            if (this.contexts[m] == null) {
                this.contexts[m] = new EntityManagerProvider(this.logger, this.eventAggregator, `http://localhost:5000/api/${m}`);
                promises.push(new Promise((resolve, reject) => {
                    this.contexts[m].prepare().then(() => resolve(true));
                }));
            }
        });
        return Promise.all(promises);
    }

    getContext(module) {
        let context = new UnitOfWork(module, this.logger, this.eventAggregator);
        this.contexts[module].create(context);
        return context;
    }

}

export class UnitOfWork {

    public manager: breeze.EntityManager;
    private modelBuilder: ModelBuilder;

    constructor(public module: string, private logger: Logger, eventAggregator: EventAggregator) {
        this.modelBuilder = new ModelBuilder(this, logger);
    }

    public create(manager: breeze.EntityManager): void {
        if (this.modelBuilder) {
            this.modelBuilder.prepare(manager.metadataStore);
        }
        this.manager = manager;
    }

    saveChanges(entities?: breeze.Entity[], resourceName?: string) {
        var saveOptions = new breeze.SaveOptions({resourceName: resourceName});
        return this.manager
            .saveChanges(entities, saveOptions)
            .then(saveResult => saveResult);
    }

    rejectChanges(entities) {
        if (entities == null || entities.length === 0) {
            return this.manager.rejectChanges();
        } else if (Array.isArray(entities)) {
            for (let entity of entities) {
                entity.entityAspect.rejectChanges();
            }
        } else {
            entities.entityAspect.rejectChanges();
        }
        return entities;
    }

    get hasChanges(): boolean {
        return this.manager.hasChanges();
    }

    getRepository(entityTypeName: string): Repository {
        return new Repository(this, entityTypeName, this.logger);
    }

    get entityTypes(): breeze.EntityType[] {
        return <breeze.EntityType[]>this.manager.metadataStore.getEntityTypes();
    }

}

class EntityManagerProvider {

    private masterManager: breeze.EntityManager;

    constructor(private logger: Logger, private eventAggregator: EventAggregator, private url: string) {
        this.masterManager = new breeze.EntityManager(url);
    }

    prepare() {
        return this.masterManager.fetchMetadata()
            .then(() => this.logger.logSuccess(null, `Metadata request succeded for ${this.url}`, null, this, false), error => this.logger.logError('Error!', 'Metadata request failed! See console for detail', error, this, true));
    }

    create(unitofwork: UnitOfWork) {
        let manager = this.masterManager.createEmptyCopy();

        // Populate with lookup data
        manager.importEntities(this.masterManager.exportEntities());

        // Subscribe to events
        manager.hasChangesChanged.subscribe(args => {
            this.eventAggregator.publish('hasChanges', args);
        });

        manager.entityChanged.subscribe(changeArgs => {
            var action = changeArgs.entityAction;

            if (action === breeze.EntityAction.EntityStateChange) {
                let entity = changeArgs.entity;
                let newEntityState = entity.entityAspect.entityState;
                this.eventAggregator.publish(newEntityState.getName().toLowerCase(), entity);
                this.logger.logSuccess(null, `ENTITY: ${entity.entityType.shortName} | STATE: ${newEntityState.getName().toUpperCase()} | Value: ${JSON.stringify(entity.entityAspect.originalValues)}`, null, this);
            }
            if (action === breeze.EntityAction.PropertyChange) {
                this.logger.logSuccess(null, `ENTITY: ${changeArgs.entity.entityType.shortName} | PROPERTY: ${(<any>changeArgs.args).propertyName} | OLD VALUE: ${(<any>changeArgs.args).oldValue} | NEW VALUE: ${(<any>changeArgs.args).newValue}`, null, this);
            }
        });

        unitofwork.create(manager);
    }

}

class ModelBuilder {

    constructor(private unitofwork: UnitOfWork, private logger: Logger) {
    }

    prepare(metadataStore) {

        let Entity = function () {
            this.remove = function () {
                if (this.isDeleted != null) {
                    this.isDeleted = true;
                } else {
                    this.entityAspect.setDeleted();
                }
            }

            this.isNew = function () {
                return this.entityAspect.entityState === breeze.EntityState.Added;
            }

            this.toJSON = function () {
                return this._backingStore;
            }
        }

        //for (let entityType of metadataStore.getEntityTypes()) {

        //}

    }

}