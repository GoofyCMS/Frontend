import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Logger} from '../resources/logger'

@Injectable()
export class HttpService {
    
    constructor(private http: Http, private logger: Logger) {
    }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<T[]> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    post<T>(url: string, body, options?: RequestOptionsArgs): Observable<T> {
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        this.logger.logError('Request failed', errMsg, error, this, true);
        return Observable.throw(errMsg);
    }

}