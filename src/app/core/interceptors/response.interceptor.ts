import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  public constructor() {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.group('From response interceptor');
            console.log(event);
            console.groupEnd();
          }

          return event;
        })
      );
  }
}
