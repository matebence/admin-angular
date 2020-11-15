import {Subscription} from 'rxjs/index';
import {FormGroup} from '@angular/forms';
import {Component, Input, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';

import {UserService} from '../../../../services/user-service/user.service';
import {GenderService} from '../../../../services/user-service/gender.service';
import {SecurityService} from '../../../../services/security-service/security.service';

import {User} from '../../../../../../shared/models/services/user/user.model';
import {Gender} from '../../../../../../shared/models/services/user/gender.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  @Input('profileForm') public form: FormGroup;

  @Output('profileResult') public onSubmitClick = new EventEmitter<boolean>();

  private user: User;
  public genders: Gender[];
  private subscriptions: Subscription[] = [];

  public constructor(private userService: UserService,
                     private genderService: GenderService,
                     private securityService: SecurityService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.genderService.getAll(0, 100)
        .subscribe((genders: Gender[]) => {
          this.genders = genders;
        })
    );

    this.subscriptions.push(
      this.userService.get(this.securityService.getAccountId())
        .subscribe((user: User) => {
          this.user = user;
          this.form.setValue({userName: user.userName, email: user.email, firstName: user.firstName, lastName: user.lastName, gender: user.gender, tel: user.tel, places: {code: user.places.code, country: user.places.country, region: user.places.region, district: user.places.district, place: user.places.place, street: user.places.street, zip: user.places.zip}})
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    const user: User = {accountId: this.user.accountId, ...this.form.value};
    this.subscriptions.push(
      this.userService.update(user)
        .subscribe((result: boolean) => {
          if (!result) return;

          this.onSubmitClick.emit(result);
        })
    );

    return;
  }

  public getInitials(): string {
    if (this.user == null) {
      return this.securityService.getUserName().substr(0, 1).toUpperCase();
    } else {
      return `${this.user.firstName.substr(0, 1)} ${this.user.lastName.substr(0, 1)}`;
    }
  }
}
