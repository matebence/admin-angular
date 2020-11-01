import {Subscription} from 'rxjs/index';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Error} from '../../../../shared/models/error/error.model';
import {User} from '../../../../shared/models/services/user/user.model';

import {UserService} from '../../services/user-service/user.service';
import {SecurityService} from '../../services/security-service/security.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  public error: Error;
  public user: User;
  public subscriptions: Subscription[] = [];

  @Input('navToogle') public toggle: boolean;

  public constructor(private securityService: SecurityService,
                     private userService: UserService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.errorDataObservable
        .subscribe((error: Error) => {
          this.error = error;
          this.user = null;
        })
    );

    this.subscriptions.push(
      this.userService.getDataObservable
        .subscribe((user: User) => {
          this.error = null;
          this.user = user;
        })
    );

    this.userService.get(this.securityService.getAccountId());
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public getFullName(): string {
    if (this.user == null) {
      return this.securityService.getUserName();
    } else {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  }

  public getInitials(): string {
    if (this.user == null) {
      return this.securityService.getUserName().substr(0, 1).toUpperCase();
    } else {
      return `${this.user.firstName.substr(0, 1)} ${this.user.lastName.substr(0, 1)}`;
    }
  }
}
