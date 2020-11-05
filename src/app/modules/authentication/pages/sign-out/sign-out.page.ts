import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {SignOut} from '../../../../shared/models/services/authorization/authorization.model';

import {AuthorizationService} from '../../services/authorization-server/authorization.service';
import {PersistenceService} from '../../../../core/services/persistence-service/persistence.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.css']
})
export class SignOutPage implements OnInit, OnDestroy {

  public signOut: SignOut;
  private subscriptions: Subscription[] = [];

  public constructor(private persistenceService: PersistenceService,
                     private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService.signOutDataObservable
        .subscribe((signOut: SignOut) => {
          this.persistenceService.clear();
          this.signOut = signOut;
        })
    );

    this.subscriptions.push(
      this.authorizationService
        .signOut()
        .subscribe((result: Boolean) => console.log(result))
    );
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }
}
