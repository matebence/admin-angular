import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ForgetPassword} from '../../../../../../shared/models/services/account/account.model';
import {AuthorizationService} from '../../../../../../core/services/authorization-server/authorization.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  public forgetPassword: ForgetPassword;
  public subscriptions: Subscription[] = [];

  public formGroup: FormGroup = new FormGroup({
    user: new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }),
    }),
  });

  public constructor(private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService.forgetPasswordDataObservable
        .subscribe((forgetPassword: ForgetPassword) => {
          this.authorizationService.setErrorData(null);
          this.forgetPassword = forgetPassword;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public onSubmit(): void {
    const email: string = this.formGroup.value.user.email;

    this.subscriptions.push(
      this.authorizationService
        .forgetPassword(email)
        .subscribe((result: Boolean) => this.formGroup.reset())
    );
  }
}
