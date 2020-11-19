import {Injectable} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RoutesRecognized} from '@angular/router';

import {environment} from '../../../environments/environment';

import {SignIn} from '../../shared/models/services/authorization/authorization.model';

import {PersistenceService} from '../services/persistence-service/persistence.service';

@Injectable()
export class RouteFilter {

  private segments: string[];

  constructor(private router: Router,
              private persistenceService: PersistenceService) {

    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent.hasOwnProperty('urlAfterRedirects') && routerEvent.urlAfterRedirects.split('/').includes('error')) return;
      this.segments = routerEvent.url != null ? routerEvent.url.split('/') : [''];
      this.categorizeEvents(routerEvent);
    });
  }

  private categorizeEvents(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationEnd) {
      this.autoSignIn();
    } else if (routerEvent instanceof NavigationStart) {
    } else if (routerEvent instanceof NavigationCancel) {
    } else if (routerEvent instanceof NavigationError) {
    } else if (routerEvent instanceof RoutesRecognized) {
    } else {
    }
  }

  private autoSignIn(): void {
    if (!this.segments.includes('sign-out') && !this.segments.includes('dashboard')) {
      const signIn = <SignIn> this.persistenceService.get(environment.LOCAL_STORAGE_ACCOUNT_DATA);
      if (signIn == null || new Date() >= signIn.expirationDate) return;
      this.router.navigate(['/manage/dashboard/home']);
    }
    return;
  }
}
