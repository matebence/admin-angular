import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from "../../../environments/environment";

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  public constructor(
    private persistenceService: PersistenceService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const segments: string[] = req.url.split('/');

    if (!segments.includes('authorization-server') || segments.includes('signout')) {
      const signIn: SignIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
      const accessToken: string = signIn.access_token;

      return next.handle(req.clone({
        headers: req.headers.set(`Authorization`, `Bearer ${accessToken}`)
      }));
    }

    return next.handle(req);
  }
}
