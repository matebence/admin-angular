import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/internal/operators";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {
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
