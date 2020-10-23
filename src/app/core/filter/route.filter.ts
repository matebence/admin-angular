import {Injectable} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RoutesRecognized} from '@angular/router';

import {environment} from '../../../environments/environment';

import {SignIn} from '../../shared/models/services/account/account.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class RouteFilter {

  constructor(private router: Router,
              private persistenceService: PersistenceService) {

    this.router.events.subscribe((routerEvent: RouterEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.autoSignIn(<NavigationEnd> routerEvent)
      } else if (routerEvent instanceof NavigationStart) {
      } else if (routerEvent instanceof NavigationCancel) {
      } else if (routerEvent instanceof NavigationError) {
      } else if (routerEvent instanceof RoutesRecognized) {
      } else {
      }
    });
  }

  private autoSignIn(navigationEnd: NavigationEnd): void {
    const segments: string[] = navigationEnd.url.split('/');
    if (!segments.includes('sign-out') && !segments.includes('dashboard')) {
      const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
      if (signIn == null || new Date() >= signIn.expirationDate) return;
      this.router.navigate(['/dashboard/home']);
    }
  }
}
