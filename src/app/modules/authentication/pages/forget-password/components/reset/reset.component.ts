import {Subscription} from "rxjs/index";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ForgetPassword} from "../../../../../../shared/models/services/account/account.model";
import {AccountService} from "../../../../../../core/services/account-service/account-service.service";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

  public error: Error;
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

  public constructor(private accountService: AccountService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.accountService.errorDataObservable
        .subscribe((error: Error) => {
          this.error = error;
        })
    );

    this.subscriptions.push(
      this.accountService.forgetPasswordDataObservable
        .subscribe((forgetPassword: ForgetPassword) => {
          this.forgetPassword = forgetPassword;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public onSubmit(): void {
    this.accountService
      .forgetPassword(this.formGroup)
      .subscribe((result) => this.formGroup.reset())
      .unsubscribe();
  }
}
