import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from '../../../environments/environment';

@Injectable()
export class BasicInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.split('/').includes('signin')) {
      return next.handle(req.clone({
        headers: req.headers.set(`Authorization`, `Basic ${btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET)}`)
      }));
    }

    return next.handle(req);
  }
}
