import {Injectable, provide, Inject} from "@angular/core";
import {Http, Response, Headers, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {Logger} from "../resources/logger";
import {Message} from "primeng/primeng";
import stringEndsWith = breeze.core.stringEndsWith;


export class Privilege {

    public RepoName: string;
    public CanCreate: boolean;
    public CanRead: boolean;
    public CanUpdate: boolean;
    public CanDelete: boolean;

    constructor(repoName: string, perms: boolean[]) {
        this.RepoName = repoName;
        this.CanCreate = perms[0];
        this.CanRead = perms[1];
        this.CanUpdate = perms[2];
        this.CanDelete = perms[3];
    }
}

export class Privileges {

    _privileges: Map<string, Privilege>;

    constructor() {
        this._privileges = new Map<string, Privilege>();
    }

    addPrivileges(repoName: string, perms: boolean[]) {
        this._privileges.set(repoName, new Privilege(repoName, perms));
    }

    getPrivileges(repoName: string): Privilege {
        return this._privileges.get(repoName);
    }
}

@Injectable()
export class AuthService {
    private _loginUrl: string;
    private _logoutUrl: string;
    private _permissionUrl: string;
    public CurrentUser: string;
    public Privileges: Privileges;
    public IsLogged: boolean;

    constructor(private http: Http) {
        this._loginUrl = "http://localhost:5000/token";
        this._permissionUrl = "http://localhost:5000/permissions";
        this._logoutUrl = "";
        this.Privileges = new Privileges();
        this.IsLogged = false;
        console.log('Executing auth constructor');
    }

    addMessage(messages: Message[], severity: string, summary: string, detail: string, timer: number = 2500): void {
        messages.push({severity: severity, summary: summary, detail: detail});

        setTimeout(function () {
            this.messages = [];
        }.bind(this), timer);
    }

    login(Username: string, Password: string, messages: Message[]): void {
        let body: any = JSON.stringify({Username, Password});
        // let body: string = `username=${Username}&password=${Password}`;
        let requestOptions: RequestOptions = new RequestOptions();
        // requestOptions.headers = contenturlencoded;
        let headersLocal = new Headers();
        headersLocal.append("Accept", "application/json");
        headersLocal.append('Content-Type', 'application/json');
        requestOptions.headers = headersLocal;
        this.http.post(this._loginUrl, body, requestOptions)
            .subscribe(
                response => {
                    console.log("status of login url: " + response.json().access_token);

                    function configureBreeze() {
                        // configure to use the model library for Angular
                        breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

                        var accessToken = response.json().access_token;

                        if (response.json().access_token) {
                            // get the current default Breeze AJAX adapter & add header required for the         Web API bearer token mechanism
                            var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
                            ajaxAdapter.defaultSettings = {
                                headers: {

                                    'Authorization': 'Bearer ' + accessToken
                                },
                            };
                        }
                    }

                    configureBreeze();


                    localStorage.setItem('token', response.json().access_token);
                    requestOptions.headers.append('Authorization', 'Bearer ' + response.json().access_token);
                    this.IsLogged = true;
                    let Permissions = ["PluginItem", "ArticleItem"];
                    let permBody = JSON.stringify({Permissions});

                    this.http.post(this._permissionUrl, permBody, requestOptions)
                        .subscribe(
                            (response: Response)=> {
                                console.log("status of permissions url: " + response.statusText);
                                let res = response.json();

                                Permissions
                                    .forEach
                                    (perm => {
                                            this.Privileges.addPrivileges(perm, res[perm]);
                                        }
                                    );

                                console.log("body of test url: " + response.json().permissions);
                            },
                            error => {
                                console.log(error.text());
                            }
                        );
                    this.addMessage(messages, "info", "Login Succesful", "Welcome to Goofy!! " + Username);
                    this.CurrentUser = Username;
                    console.log(response.json());
                },
                error => {
                    console.log(error.text());
                    this.addMessage(messages, "error", "Login Failed", "Invalid Credentials");
                }
            );
    }

    logout(messages: Message[]): void {
        this.addMessage(messages, "info", "Logout Succesful", "Bye " + this.CurrentUser);
        localStorage.removeItem("token");
        this.IsLogged = false;
    }

    getToken(): string {
        return localStorage.getItem("token");
    }

    // isLogged(): boolean {
    //     return this.getToken() !== null;
    // }

}

export var AUTH_PROVIDERS: Array<any> = [
    provide('AuthServiceProvider', {useExisting: AuthService}),
];
