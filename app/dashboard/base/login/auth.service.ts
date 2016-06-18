import {Injectable, provide, Inject} from "@angular/core";
import {Http, Response, Headers, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {contentHeaders, contenturlencoded} from "./headers";
import {Logger} from "../../../shared/resources/logger";
import {Message} from "primeng/primeng";
import {CookieService} from "angular2-cookie/core";


@Injectable()
export class AuthService {
    private _loginUrl: string;
    private _logoutUrl: string;
    private _testUrl: string;


    constructor(private http: Http, @Inject(Logger) private logger, @Inject(CookieService) _cookieService: CookieService) {
        this._loginUrl = "http://localhost:5000/token";
        this._testUrl = "http://localhost:5000/test_something"
    }


    addMessage(messages: Message[], severity: string, summary: string, detail: string, timer: number = 2500): void {
        messages.push({severity: severity, summary: summary, detail: detail});

        setTimeout(function () {
            this.messages = [];
        }.bind(this), timer);
    }

    login(username: string, password: string, messages: Message[]): void {
        let body: any = JSON.stringify({username, password});
        // let body: string = `username=${username}&password=${password}`;
        let requestOptions: RequestOptions = new RequestOptions();
        requestOptions.headers = contentHeaders;
        this.http.post(this._loginUrl, body, requestOptions)
            .subscribe(
                response => {
                    console.log("status of login url: " + response.json().access_token);

                    this.http.get(this._testUrl, requestOptions)
                        .subscribe(
                            response => {
                                console.log("status of test url: " + response.statusText);
                                console.log("body of test url: " + response.toString());
                            },
                            error => {
                                console.log(error.text());
                            }
                        );

                    localStorage.setItem("username", username);
                    this.addMessage(messages, "info", "Login Succesful", "Welcome to Goofy!!");
                    console.log(response.json());
                },
                error => {
                    console.log(error.text());
                    this.addMessage(messages, "error", "Login Failed", "Invalid Credentials");
                }
            );
    }

    getUserAuth(url: string, email: string, password: string) {
        let Register: any = {"Email": email, "Password": password, "ConfirmPassword": password};
        let Email: string = email;
        let Password: string = password;
        let ConfirmPassword: string = password;
        // var stringifyReg = stringify(register);
        // var creds:string = "email=" + email + "&" + "password=" + password + "&" + "confirmPassword=" + password;

        let body = JSON.stringify(Register);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8"
        });
        let options = new RequestOptions({headers: headers});
        console.log(url);
        console.log(body);
        console.log(headers);

        // console.log(stringifyReg);
        this.http.post(
            url,
            body,
            options
        ).map((res: Response) => res.json())
            .subscribe();
    }

    logout(messages: Message[]): void {
        localStorage.removeItem("username");
    }

    getUser(): any {
        return localStorage.getItem("username");
    }

    isLogged(): boolean {
        return this.getUser() !== null;
    }
}

export var AUTH_PROVIDERS: Array<any> = [
    provide(AuthService, {useClass: AuthService}),
];
