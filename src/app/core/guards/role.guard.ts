import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';

import {environment} from '../../../environments/environment';

import {RouteDataTransport} from '../../shared/models/router/router.model';

import {SecurityService} from '../../modules/dashboard/services/security-service/security.service';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild {

  public constructor(private router: Router,
                     private securityService: SecurityService) {
  }

  public canActivate(routeDataTransport: RouteDataTransport): boolean {
    if (this.securityService.isInRole(routeDataTransport.data.roles)) {
      return true;
    } else {
      if (this.securityService.isInRole([environment.APP_ROLE_MANAGER, environment.APP_ROLE_ADMIN])) {
        this.router.navigate(['/manage/dashboard/home']);
      } else {
        this.router.navigate(['/manage/auth/sign-out']);
      }
      return false;
    }
  }

  public canActivateChild(routeDataTransport: RouteDataTransport): boolean {
    return this.canActivate(routeDataTransport)
  }
}
