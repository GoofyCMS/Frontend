import {ReflectiveInjector} from "@angular/core";
import {Component, OnInit, Inject} from "@angular/core";
import {Dialog, Button, MultiSelect, InputText, Password} from "primeng/primeng";
import {DataTableWrapper} from "../../../../shared/resources/datatable";
import {FormlyForm} from "./../../../../shared/auto-forms/components/formly.form";
import {FormlyMessages} from "./../../../../shared/auto-forms/services/formly.messages";
import {FormlyConfig} from "./../../../../shared/auto-forms/services/formly.config";
import {Logger} from "./../../../../shared/resources/logger";
import {Router} from "@angular/router-deprecated";
import {CrudDialogManagerComponent} from "../../../../shared/base-classes/crud-dialog-manager.component";
import {UnitOfWorkFactory} from "../../../../shared/services/unitofwork";
import {FormBuilder} from "@angular/common";
import {Headers, RequestOptions, Http} from "@angular/http";
import none = ts.HighlightSpanKind.none;
import {Repository} from "../../../../shared/services/repository";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
    selector: "users",
    templateUrl: "./app/dashboard/base/auth/user/user.component.html",
    directives: [FormlyForm, Button, Dialog, DataTableWrapper, Dialog, Button, InputText, MultiSelect, Password],
    providers: [FormlyConfig, FormlyMessages],
})
export class UserComponent extends CrudDialogManagerComponent implements OnInit {
    private permissionsRepo: Repository;
    permissions = [];
    permissionsSelect = [];

    private rolesRepo: Repository;
    rolesSelect = [];
    roles = [];

    private userRolesRepo: Repository;
    userRoles = [];

    private userClaimsRepo: Repository;
    userClaims = [];

    selectedPermissions = [];
    oldSelectedPermissions = [];
    selectedRoles = [];
    oldSelectedRoles = [];

    showAddDialog: boolean = false;
    showEditDialog: boolean = false;

    constructor(@Inject(UnitOfWorkFactory) uowf: UnitOfWorkFactory,
                @Inject(Logger) logger: Logger,
                @Inject(Router) router,
                fm: FormlyMessages,
                fc: FormlyConfig,
                fb: FormBuilder,
                private http: Http,
                @Inject('AuthServiceProvider') public _authService: AuthService) {
        super(uowf, logger, router, 'administration', 'GoofyUserItem', fm, fc, fb);

        this.fillSelects();
    }

    public getAuth(id) {
        this.getUserPermissions();
        this.getSelected(id);
    }

    private containRole(role, list: any[]) {
        let a = list.some(r=> r.roleId == role.roleId);
        return a;
    }

    private containClaim(claim, list: any[]) {
        let a = list.some(c=> c == claim.claimType);
        return a;
    }

    private containClaim2(claim, list: any[]) {
        let a = list.some(c=> c.claimType == claim);
        return a;
    }

    private getDifferentClaims(oldlist: any[], newlist: any[]) {
        let forRemove = [];
        for (let i = 0; i < oldlist.length; i++)
            if (!this.containClaim(oldlist[i], newlist))
                forRemove.push(oldlist[i]);

        return forRemove;
    }

    private getDifferentClaims2(oldlist: any[], newlist: any[]) {
        let forRemove = [];
        for (let i = 0; i < oldlist.length; i++)
            if (!this.containClaim2(oldlist[i], newlist))
                forRemove.push(oldlist[i]);

        return forRemove;
    }

    private getDifferentRoles(oldlist: any[], newlist: any[]) {
        let forRemove = [];
        for (let i = 0; i < oldlist.length; i++)
            if (!this.containRole(oldlist[i], newlist))
                forRemove.push(oldlist[i]);

        return forRemove;
    }

    public getSelected(id) {

        //me quedo con los claims pertenecientes al usuario
        this.oldSelectedPermissions = [];
        this.selectedPermissions = [];

        for (let i = 0; i < this.userClaims.length; i++) {
            if (this.userClaims[i].userId == id) {
                this.selectedPermissions.push(this.userClaims[i].claimType);
                this.oldSelectedPermissions.push(this.userClaims[i]);
            }
        }

        this.selectedRoles = [];
        this.oldSelectedRoles = [];
        for (let i = 0; i < this.userRoles.length; i++) {
            if (this.userRoles[i].userId == id) {
                this.selectedRoles.push(this.userRoles[i].roleId);
                this.oldSelectedRoles.push(this.userRoles[i]);
            }
        }

    }

    public getUserPermissions() {
        this.userClaimsRepo = this.context.getRepository('IdentityUserClaimItem');
        this.userRolesRepo = this.context.getRepository('IdentityUserRoleItem');

        this.userClaimsRepo.getAll()
            .then(
                c=> this.userClaims = c.results
            );
        this.userRolesRepo.getAll()
            .then(
                c=> this.userRoles = c.results
            );
    }

    public fillSelects() {
        this.permissionsRepo = this.context.getRepository('PermissionItem');
        this.rolesRepo = this.context.getRepository('GoofyRoleItem');

        this.populateCollections();
        this.populateSelects();
    }

    currentUser;


    public edit() {
        this.clearDialog();
        this.showEditDialog = false;

        let removedClaims = this.getDifferentClaims(this.oldSelectedPermissions, this.selectedPermissions);
        let removedRoles = this.getDifferentRoles(this.oldSelectedRoles, this.selectedRoles);
        let newClaims = this.getDifferentClaims2(this.selectedPermissions, this.oldSelectedPermissions);
        let newRoles = this.getDifferentRoles(this.selectedRoles, this.oldSelectedRoles);

        for (let i = 0; i < newClaims.length; i++)
            this.userClaimsRepo.add({
                id: -i - 1,
                userId: this.currentUser.id,
                claimType: newClaims[i],
                claimValue: ""
            });
        for (let i = 0; i < newRoles.length; i++)
            this.userRolesRepo.add({userId: this.currentUser.id, roleId: newRoles[i]});
        this.userClaimsRepo.remove(removedClaims);
        this.userRolesRepo.remove(removedRoles);


        // this.context.saveChanges();

        this.userClaimsRepo.saveChanges()
            .then(
                ()=>{
                    this.userClaimsRepo.rejectChanges();
                    this.userRolesRepo.rejectChanges();
                })
            .catch(()=> {
            })

            .then(
                ()=>this.fillSelects());

        this.currentUser = null;
    }

    public populateCollections() {
        this.permissionsRepo.getAll()
            .then(
                c=> this.permissions = c.results
            );
        this.rolesRepo.getAll()
            .then(
                c=> this.roles = c.results
            );
    }

    public populateSelects() {
        this.permissionsSelect = [];
        for (let i = 0; i < this.permissions.length; i++) {
            this.permissionsSelect.push({label: this.permissions[i].name, value: this.permissions[i].name})
        }
        this.rolesSelect = [];
        for (let i = 0; i < this.roles.length; i++) {
            this.rolesSelect.push({label: this.roles[i].name, value: this.roles[i].id})
        }
    }

    public addDialog() {
        this.dialogHeader = 'Add ' + this.entityName;
        this.dialogCancel = () => {
            this.clearDialog();
            this.showAddDialog = false;
        };
        this.showAddDialog = true;
    }

    public add(Username: string, Password: string) {
        this.clearDialog();
        this.showAddDialog = false;

        let body: any = JSON.stringify({Username, Password});
        let requestOptions: RequestOptions = new RequestOptions();
        // let headersLocal = new Headers();
        // headersLocal.append("Accept", "application/json");
        // headersLocal.append('Content-Type', 'application/json');
        // headersLocal.append('Authorization', localStorage.getItem('token'));
        // requestOptions.headers = headersLocal;
        requestOptions.headers = this._authService.headers;
        this.http.post('http://localhost:5000/api/administration/register', body, requestOptions)
            .subscribe(
                response => {
                    console.log("status of login url: " + response.status);
                    console.log(response.json());
                    this.datasource.reload();
                },
                error => {
                    console.log(error.text());
                }
            );
    }

    public editDialog(item) {
        this.fillSelects();
        this.currentUser = item;
        this.getAuth(item.id);
        this.dialogHeader = 'Edit ' + this.entityName;
        this.dialogCancel = () => {
            this.clearDialog();
            this.showEditDialog = false;
        };
        this.showEditDialog = true;
    }


    ngOnInit(): void {
    }
}

