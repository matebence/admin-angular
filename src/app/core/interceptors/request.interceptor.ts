import {Observable} from 'rxjs/index';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  public constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.group('From request interceptor');
    console.log(req);
    console.groupEnd();

    return next.handle(req);
  }
}
