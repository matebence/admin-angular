import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from "../../../environments/environment";

@Injectable()
export class BasicInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.split("/").includes('signin')) {
      return next.handle(req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET)
        })
      }));
    }
  }
}
