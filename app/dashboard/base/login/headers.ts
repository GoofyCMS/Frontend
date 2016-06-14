import {Headers} from "@angular/http";

export const contentHeaders: Headers = new Headers();
contentHeaders.append("Accept", "application/json");
contentHeaders.append('Content-Type', 'application/json');
// contentHeaders.append('Access-Control-Allow-Credentials', 'anonymous');