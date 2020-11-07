import {Observable} from 'rxjs';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: (event: boolean) => Observable<boolean> | Promise<boolean> | boolean;
}

export class LeaveGuard implements CanDeactivate<CanComponentDeactivate> {
  public canDeactivate(component: CanComponentDeactivate,
                       currentRoute: ActivatedRouteSnapshot,
                       currentState: RouterStateSnapshot,
                       nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return component.canDeactivate(false);
  }
}
