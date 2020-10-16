import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AccessManagerGuard implements CanActivate {

  public constructor() {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  }
}
