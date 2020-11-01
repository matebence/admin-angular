import {Subscription} from 'rxjs/index';
import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Error} from '../../../../shared/models/error/error.model';
import {Recover} from '../../../../shared/models/services/account/account.model';

import {AuthorizationService} from '../../services/authorization-server/authorization.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.css']
})
export class ForgetPasswordPage implements OnInit, OnDestroy {

  public error: Error;
  public recover: Recover;
  private subscriptions: Subscription[] = [];

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService.errorDataObservable
        .subscribe((error: Error) => {
          this.error = error;
          this.recover = null;
        })
    );

    if (this.activatedRoute.firstChild == null) return;

    this.subscriptions.push(
      this.activatedRoute.firstChild.params
        .pipe(switchMap((params: Params) => {
          if (!params) {
            this.router.navigate(['/forget-password'])
          } else {
            return this.authorizationService.recover(params)
          }
        }))
        .subscribe((recover: Boolean) => console.log(recover))
    );

    this.subscriptions.push(
      this.authorizationService.recoverDataObservable
        .subscribe((recover: Recover) => {
          this.error = null;
          this.recover = recover;
        })
    );
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }
}
