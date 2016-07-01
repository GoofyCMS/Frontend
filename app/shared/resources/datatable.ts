/// <reference path="../../../typings/breeze/breeze.d.ts" />
import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {DataTable, Column, Menubar, Dialog, Button, LazyLoadEvent} from 'primeng/primeng';

import {Logger} from './logger';
import {Datasource} from '../services/datasource';
import {EventAggregator} from '../services/event-aggregator';

@Component({
    selector: 'datatable',
    templateUrl: 'app/shared/resources/datatable.html',
    directives: [DataTable, Column, Menubar, Dialog, Button],
    inputs: ['datasource', 'lazy', 'paginator', 'columns', 'selectionMode', 'selected', 'responsive', 'resizableColumns', 'reorderableColumns', 'scrollable', 'scrollHeight', 'scrollWidth', 'initialValues', 'canAdd', 'canDelete', 'canEdit', 'canSave'],
    outputs: ['editEvent', 'addEvent', 'delEvent']
})
export class DataTableWrapper implements OnInit {

    editEvent: EventEmitter<any>;
    addEvent: EventEmitter<any>;
    delEvent: EventEmitter<any>;

    public datasource: Datasource;
    public lazy: boolean = true;
    public paginator: boolean = true;

    public columns: Column[];
    public resizableColumns: boolean = true;
    public reorderableColumns: boolean = true;

    public selectionMode: string = 'multiple';
    public selected: any;

    public responsive: boolean = true;
    public scrollable: boolean = false;
    public scrollHeight: number = 200;
    public scrollWidth: number = null;

    public canAdd: boolean = true;
    public canDelete: boolean = true;
    public canEdit: boolean = true;
    public canSave: boolean = true;
    public initialValues: any = null;

    private hasChanges: boolean;
    private firstTime: boolean;

    constructor(private logger: Logger, private router: Router, private eventAggregator: EventAggregator) {
        eventAggregator.subscribe('hasChanges', (args) => {
            this.hasChanges = args.hasChanges;
        });
        this.editEvent = new EventEmitter();
        this.addEvent = new EventEmitter();
        this.delEvent = new EventEmitter();
        this.firstTime = true;

    }

    ngOnInit() {
        this.logger.logInfo(null, `Data table for ${this.datasource.asRepository.entityType.shortName}`, null, this);
    }

    addCommand() {
        this.addEvent.emit(null);
    }

    deleteCommand() {
        this.delEvent.emit(this.selected)
    }

    editCommand() {
        let keyField = this.datasource.asRepository.entityType.keyProperties[0].name;
        let selected = Array.isArray(this.selected) ? this.selected[0] : this.selected;
        let id = (selected)[keyField];
        this.editEvent.emit(selected);
    }

    saveChangesCommand() {
        this.datasource.saveChanges()
            .then(() => {
                this.logger.logSuccess('Success!', 'All changes are saved!', null, this, true);
                this.datasource.reload()
                    .then(()=> this.logger.logSuccess('Success!', 'All data reloaded!', null, this, true))
            })
            .catch((e) => this.logger.logError('Error!', `There's an error in the request`, e, this, true));
    }

    rejectChangesCommand() {
        this.datasource.rejectChanges()
            .then(()=> this.datasource.reload());
    }

    loadData(event: LazyLoadEvent) {
        // this.datasource.count = event.rows || 10;
        this.datasource.count = 100000;
        this.datasource.page = event.first / this.datasource.count + 1;
        if (event.sortField) {
            this.datasource.orderBy = `${event.sortField} ${event.sortOrder === 1 ? 'asc' : 'desc'}`;
        }
        if (event.filters && Object.getOwnPropertyNames(event.filters).length > 0) {
            let filters = Object.getOwnPropertyNames(event.filters);
            this.datasource.where = breeze.Predicate.and(filters.map(f => breeze.Predicate.create(f, event.filters[f].matchMode, event.filters[f].value)));
        }
        if (this.firstTime) {
            this.firstTime = !this.firstTime;
            return this.datasource.reload();
        }
        else {
            return this.datasource.reload(true);
        }
    }
}