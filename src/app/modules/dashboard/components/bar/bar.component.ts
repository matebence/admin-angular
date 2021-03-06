import {Subscription} from 'rxjs/index';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {User} from '../../../../shared/models/services/user/user.model';

import {UserService} from '../../services/user-service/user.service';
import {SecurityService} from '../../services/security-service/security.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  public user: User;
  private subscriptions: Subscription[] = [];

  @Input('navToogle') public toggle: boolean;

  public constructor(private securityService: SecurityService,
                     private userService: UserService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.get(this.securityService.getAccountId())
        .subscribe((user: User) => {
          this.user = user;
        })
    );

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
