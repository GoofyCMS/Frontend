/// <reference path="../../../typings/breeze/breeze.d.ts" />
import {Component, Inject, AfterViewInit, ContentChild, ViewEncapsulation, EventEmitter} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {Menubar, Dialog, Button, Paginator} from 'primeng/primeng';

import {Logger} from './logger';
import {Datasource} from '../services/datasource';
import {EventAggregator} from '../services/event-aggregator';

@Component({
    selector: 'data-form',
    templateUrl: 'resources/dataform.html',
    directives: [Menubar, Dialog, Button, Paginator],
    inputs: ['datasource', 'paginator', 'id', 'initialValues', 'canAdd', 'canDelete', 'canEdit', 'canSave'],
    styles: ['.ng-valid[required] {border-left: 5px solid #42A948; /* green */}', '.ng-invalid {border-left: 5px solid #a94442; /* red */}'],
    encapsulation: ViewEncapsulation.None
})
export class DataFormWrapper implements AfterViewInit {

    public datasource: Datasource;
    public paginator: boolean = true;
    public item;
    public id;

    public canAdd: boolean = true;
    public canDelete: boolean = true;
    public canEdit: boolean = true;
    public canSave: boolean = true;
    public initialValues: any = null;

    private headerDialog;
    private showDialog: boolean = false;
    private contentDialog: string;
    private dialogOperation: Function;

    private hasChanges: boolean = false;

    constructor( @Inject(Logger) private logger, @Inject(Router) private router, @Inject(EventAggregator) private eventAggregator: EventAggregator) {
        eventAggregator.subscribe('hasChanges', (args) => {
            this.hasChanges = args.hasChanges;
        })
    }

    ngAfterViewInit() {
        this.logger.logInfo(null, `Data form for ${this.datasource.asRepository.entityType.shortName}`, this, this)
        if (this.id === 'new') {
            return this.datasource.add().then(item => {
                this.item = item;
            });
        } else {
            return this.datasource.find(this.id).then(item => {
                this.item = item;
            });
        }
    }

    addCommand() {
        this.datasource.add(this.initialValues).then(item => {
            this.item = item;
            //this.addEvent.emit(item);
        });
    }

    deleteCommand() {
        this.headerDialog = 'Are you sure you want to continue?';
        this.contentDialog = 'The selected items will be market as deleted.';
        this.dialogOperation = () => this.datasource.remove(this.item);
        this.showDialog = true;
    }

    saveChangesCommand() {
        this.headerDialog = 'Are you sure you want to continue?';
        this.contentDialog = 'Current changes will be saved.';
        this.dialogOperation = () => this.datasource.saveChanges()
            .then(() => this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true))
            .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
        this.showDialog = true;
    }

    rejectChangesCommand() {
        this.headerDialog = 'Are you sure you want to continue?';
        this.contentDialog = 'Current changes will be reverted.';
        this.dialogOperation = () => this.datasource.rejectChanges();
        this.showDialog = true;
    }

    loadData(event) {
        this.datasource.count = event.rows || 1;
        this.datasource.page = event.first / this.datasource.count + 1;
        if (event.sortField) {
            this.datasource.orderBy = `${event.sortField} ${event.sortOrder === 1 ? 'asc' : 'desc'}`;
        }
        if (event.filters && event.filters.length > 0) {
            this.datasource.where = breeze.Predicate.and(event.filters.map(f => breeze.Predicate.create(f.field, f.filterMatchMode, f.value)));
        }
        return this.datasource.reload().then(res => {
            this.item = this.datasource.items[0];
        });
    }

    confirm() {
        this.dialogOperation();
        this.cancel();
    }

    cancel() {
        this.showDialog = false;
        this.dialogOperation = null;
    }

}