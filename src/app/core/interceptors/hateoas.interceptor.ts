import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class HateoasInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.body.hasOwnProperty('_embedded')) {
            let clone: HttpResponse = event.clone();
            if (event.body._embedded.hasOwnProperty('usersList')) {
              clone.body = event.body._embedded.usersList;
            }
            return clone;
          }
          return event;
        })
      );
  }
}
