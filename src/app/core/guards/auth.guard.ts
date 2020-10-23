import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {environment} from '../../../environments/environment';

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private router: Router,
                     private persistenceService: PersistenceService) {
  }

  public canActivate(): boolean {
    const result: boolean = this.isAuthenticated();
    if (!result) {
      this.router.navigate(['/auth/sign-in']);
      return result;
    }
    return result;
  }

  protected isAuthenticated(): boolean {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    return !(signIn == null || new Date() >= signIn.expirationDate);
  }
}
