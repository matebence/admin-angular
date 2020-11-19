import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {SecurityService} from '../../modules/dashboard/services/security-service/security.service';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private router: Router,
                     private securityService: SecurityService) {
  }

  public canActivate(): boolean {
    if (this.securityService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/auth/sign-in']);
    }
  }
}
