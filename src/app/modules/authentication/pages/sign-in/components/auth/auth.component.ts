import {Router} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Error} from '../../../../../../shared/models/error/error.model';
import {AuthorizationService} from '../../../../services/authorization-server/authorization.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public error: Error;
  public subscriptions: Subscription[] = [];

  public formGroup: FormGroup = new FormGroup({
    user: new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.required],
        updateOn: 'change'
      }),
      password: new FormControl(null, {
        // validators: [Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})'), Validators.required],
        updateOn: 'change'
      })
    }),
    remain: new FormControl(false),
  });

  public constructor(private router: Router,
                     private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizationService.errorDataObservable
        .subscribe((error: Error) => {
          this.error = error;
          this.authorizationService.setSignOutData(null);
        })
    );
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    const remain: boolean = this.formGroup.value.remain;
    const userName: string = this.formGroup.value.user.name;
    const password: string = this.formGroup.value.user.password;

    this.subscriptions.push(
      this.authorizationService
        .OAuth2Password(userName, password, remain)
        .subscribe((result: Boolean) => {
          if (!result) return;
          this.formGroup.reset();
          this.router.navigate(['/dashboard/home']);
        })
    );
    return;
  }
}
