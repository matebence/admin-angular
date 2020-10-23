import JWTDecoder from 'jwt-decode';
import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import {environment} from '../../../environments/environment';

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class RoleGuard implements CanActivate {

  public constructor(private router: Router,
                     private persistenceService: PersistenceService) {
  }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const result: boolean = this.isInRole(route);
    if (!result) {
      this.router.navigate(['/dashboard/home']);
      this.persistenceService.clear();
      return result;
    }
    return result;
  }

  protected isInRole(route: ActivatedRouteSnapshot): boolean {
    const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
    const accessToken: string = signIn.access_token;
    const tokenPayload = JWTDecoder(accessToken);

    return route.data.roles.some(r => tokenPayload.authorities.includes(r));
  }
}
