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
          if (event instanceof HttpResponse && event.body != null && event.body.hasOwnProperty('_embedded')) {
            if (event.body._embedded.hasOwnProperty('usersList')) {
              return event.clone({body: event.body._embedded.usersList});
            } else if (event.body._embedded.hasOwnProperty('gendersList')) {
              return event.clone({body: event.body._embedded.gendersList});
            } else if (event.body._embedded.hasOwnProperty('paymentsList')) {
              return event.clone({body: event.body._embedded.paymentsList});
            } else if (event.body._embedded.hasOwnProperty('payoutsList')) {
              return event.clone({body: event.body._embedded.payoutsList});
            } else if (event.body._embedded.hasOwnProperty('accountsList')) {
              return event.clone({body: event.body._embedded.accountsList});
            } else if (event.body._embedded.hasOwnProperty('rolesList')) {
              return event.clone({body: event.body._embedded.rolesList});
            } else if (event.body._embedded.hasOwnProperty('privilegesList')) {
              return event.clone({body: event.body._embedded.privilegesList});
            } else if (event.body._embedded.hasOwnProperty('preferencesList')) {
              return event.clone({body: event.body._embedded.preferencesList});
            }
          } else if (event instanceof HttpResponse && event.body != null && event.body.hasOwnProperty('data')) {
            return event.clone({body: event.body.data});
          }
          return event;
        })
      );
  }
}
