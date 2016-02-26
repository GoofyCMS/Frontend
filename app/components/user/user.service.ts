import {stringify} from "angular2/src/facade/lang";
"use strict";
import {Injectable} from 'angular2/core'
import {USERS} from './mock-users';
import {IUser} from './user';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {RequestOptions} from "angular2/http";


@Injectable()
export class UserService {

    private headers;
    private url:string;

    constructor(private http:Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.url = 'http://192.168.249.50:5000/auth/pepe';
        http.get(this.url)
            .map((res:Response)=>res.json())
            .do(r => console.log(r))
            .subscribe();

    }

    public users;

    getUsers() {
        return Observable.fromArray(USERS);
    }

    getUser(id:number) {
        return Observable.fromArray(USERS)
            .filter(user => user.id == id)
            .subscribe();
    }

    getUserAuth(url:string, email:string, password:string) {
        var Register = {'Email': email, 'Password': password, 'ConfirmPassword': password};
        var Email = email;
        var Password = password;
        var ConfirmPassword = password;
        //var stringifyReg = stringify(register);
        //var creds:string = 'email=' + email + '&' + 'password=' + password + '&' + 'confirmPassword=' + password;

        let body = JSON.stringify({Email, Password, ConfirmPassword});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log(body);
        //console.log(stringifyReg);
        this.http.post(
            url,
            body
        ).map((res:Response) => res.json())
            .do(r => console.log(r))
            .subscribe();
    }

    checkUser(name:string, password:string) {
        var result:IUser[] = [];

        var obs = Observable.fromArray(USERS)
            .filter(u => u.name == name && u.password == password)
            .subscribe(res => result.push(res));

        return result.length > 0;
    }
}

