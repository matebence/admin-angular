import {Observable} from 'rxjs/index';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {environment} from "../../../environments/environment";

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  public constructor(
    private persistenceService: PersistenceService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const signIn: SignIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);

    const segments: string[] = req.url.split('/');
    let cloned : HttpRequest<any>;

    if (!segments.includes('authorization-server') || segments.includes('signout')) {
      const accessToken: string = signIn.access_token;
      cloned = req.clone({headers: req.headers.set(`Authorization`, `Bearer ${accessToken}`)});
    } else if (segments.includes('authorization-server') && segments.includes('signin')) {
      const basicToken = btoa(environment.CLIENT_ID + ':' + environment.CLIENT_SECRET);
      cloned = req.clone({headers: req.headers.set(`Authorization`, `Basic ${basicToken}`)});
    } else {
      cloned = req.clone();
    }

    return next.handle(cloned);
  }
}
