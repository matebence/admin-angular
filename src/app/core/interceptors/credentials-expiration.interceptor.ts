import {Observable} from 'rxjs/index';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {environment} from '../../../environments/environment';

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';
import {AuthorizationService} from '../../modules/authentication/services/authorization-server/authorization.service';

@Injectable()
export class CredentialsExpirationInterceptor implements HttpInterceptor {

  public constructor(private router: Router,
                     private persistenceService: PersistenceService,
                     private authorizationService: AuthorizationService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(map((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {
            const segments: string[] = req.url.split('/');

            if (segments.includes('authorization-server') && segments.includes('signin')) {
              let signIn: SignIn = <SignIn> event.body;
              if (signIn == null || signIn.access_token == null) return event;

              const expiration: number = (new Date().getTime() / 1000) + signIn.expires_in;
              const current: number = new Date().getTime() / 1000;
              const timer: number = (expiration - current) * 1000;

              setTimeout(() => {
                signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
                if (signIn.remain) {
                  this.authorizationService.OAuth2RefreshToken(signIn.remain, signIn.refresh_token);
                } else {
                  this.router.navigate(['/auth/sign-out']);
                }
              }, timer);
            }
          }

          return event;
        })
      );
  }
}
