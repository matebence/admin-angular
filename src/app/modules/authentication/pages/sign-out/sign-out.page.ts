import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthorizationService} from '../../../../core/services/authorization-server/authorization.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.css']
})
export class SignOutPage implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];

  public constructor(
    private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService
        .signOut()
        .subscribe((result: Boolean) => console.log(result))
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }
}
