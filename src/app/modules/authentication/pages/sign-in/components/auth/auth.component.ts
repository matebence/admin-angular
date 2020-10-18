import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Error} from '../../../../../../shared/models/error/error.model';
import {SignIn} from '../../../../../../shared/models/services/account/account.model';
import {AuthorizationService} from '../../../../../../core/services/authorization-server/authorization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public error: Error;
  public signIn: SignIn;
  public subscriptions: Subscription[] = [];

  public formGroup: FormGroup = new FormGroup({
    user: new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.required],
        updateOn: 'change'
      }),
      password: new FormControl(null, {
        validators: [Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})'), Validators.required],
        updateOn: 'change'
      })
    }),
    remain: new FormControl(false),
  });

  public constructor(private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService.errorDataObservable
        .subscribe((error: Error) => {
          this.error = error;
          this.signIn = null;
          this.authorizationService.setSignOutData(null);
        })
    );

    this.subscriptions.push(
      this.authorizationService.signInDataObservable
        .subscribe((signIn: SignIn) => {
          this.error = null;
          this.signIn = signIn;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public onSubmit(): void {
    const remain: boolean = this.formGroup.value.remain;
    const userName: string = this.formGroup.value.user.name;
    const password: string = this.formGroup.value.user.password;

    this.subscriptions.push(
      this.authorizationService
        .signIn(userName, password, remain)
        .subscribe((result: Boolean) => this.formGroup.reset())
    );
  }
}
