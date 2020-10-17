import {Component, OnInit} from '@angular/core';

import {Error} from '../../../../shared/models/error/error.model';
import {SignOut} from '../../../../shared/models/services/account/account.model';

import {AuthorizationService} from '../../../../core/services/authorization-server/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.css']
})
export class SignInPage implements OnInit {

  public error: Error;
  public signOut: SignOut;

  public constructor(
    private authorizationService: AuthorizationService) {
  }

  public ngOnInit(): void {
    this.error = this.authorizationService.getErrorData();
    this.signOut = this.authorizationService.getSignOutData();
  }
}
