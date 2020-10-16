import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class TypeInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.split('/').includes('signin')) {
      return next.handle(req.clone({
        headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
      }));
    } else {
      return next.handle(req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      }));
    }
  }
}
