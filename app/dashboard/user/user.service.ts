import {Injectable} from "angular2/core";
import {USERS} from "./mock-users";
import {IUser} from "./user";
import {Http, Response, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/rx";


@Injectable()
export class UserService {

    private headers;
    private url: string;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.url = "http://192.168.249.50:5000/auth/pepe";
        // http.get(this.url)
        //     .map((res: Response) => res.json())
        //     .do(r => console.log(r))
        //     .subscribe();
    }

    getUsers() {
        return Observable.from(USERS);
    }

    getUser(id: number) {
        return Observable.from(USERS)
            .filter(user => user.id === id)
            .subscribe();
    }

    getUserAuth(url: string, email: string, password: string) {
        let Register: any = { "Email": email, "Password": password, "ConfirmPassword": password };
        let Email: string = email;
        let Password: string = password;
        let ConfirmPassword: string = password;
        // var stringifyReg = stringify(register);
        // var creds:string = "email=" + email + "&" + "password=" + password + "&" + "confirmPassword=" + password;

        let body = JSON.stringify(Register);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8"
        });
        let options = new RequestOptions({ headers: headers });
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

    checkUser(name: string, password: string) {
        let result: IUser[] = [];

        let obs = Observable.create(USERS)
            .filter(u => u.name === name && u.password === password)
            .subscribe(res => result.push(res));

        return result.length > 0;
    }
}

