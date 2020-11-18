import JWTDecoder from 'jwt-decode';
import {Injectable} from '@angular/core';

import {environment} from '../../../../../environments/environment';

import {SignIn} from '../../../../shared/models/services/authorization/authorization.model';

import {BaseService} from '../../../../core/services/base.service';
import {PersistenceService} from '../../../../core/services/persistence-service/persistence.service';

@Injectable()
export class SecurityService extends BaseService {

  public constructor(private persistenceService: PersistenceService) {
    super();
  }

  public isInRole(roles: string[]): boolean {
    return roles.some(r => this.getAuthorities().includes(r));
  }

  public isAuthenticated(): boolean {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    return !(signIn == null || new Date() >= signIn.expirationDate);
  }

  public getUserName(): string {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    return signIn.user_name;
  }

  public getAccountId(): number {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    return signIn.account_id;
  }

  public getAuthorities(): string[] {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    const jwt: any = JWTDecoder(signIn.access_token);
    return jwt.authorities;
  }
}
