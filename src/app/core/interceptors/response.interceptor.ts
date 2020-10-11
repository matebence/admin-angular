import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import 'rxjs/add/operator/do';

export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => {
        console.log(event);
      }
    )
  }
}
