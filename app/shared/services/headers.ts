import {Headers} from "@angular/http";

export const contentHeaders: Headers = new Headers();
contentHeaders.append("Accept", "application/json");
contentHeaders.append('Content-Type', 'application/json');

export const contenturlencoded: Headers = new Headers();
contenturlencoded.append("Accept", "application/json");
contenturlencoded.append("Content-Type", "application/x-www-form-urlencoded");
