import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class TypeInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const segments: string[] = req.url.split('/');
    let cloned: HttpRequest<any>;

    if (segments.includes('signin')) {
      cloned = req.clone({headers: req.headers.set(`Content-Type`, `application/x-www-form-urlencoded`)});
    } else {
      cloned = req.clone({headers: req.headers.set(`Content-Type`, `application/json`)});
    }

    return next.handle(cloned);
  }
}
