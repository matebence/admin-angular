import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Component, OnDestroy, OnInit} from '@angular/core';

import tableConfig from '../../../../../../configs/table.config.json';

import {User} from '../../../../../../shared/models/services/user/user.model';

import {UserService} from '../../../../services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public settings: any = {
    ...tableConfig,
    columns: {
      userId: {
        title: 'ID konta'
      },
      accountId: {
        title: 'ID používateľa'
      },
      email: {
        editable: false,
        addable: false,
        title: 'Email'
      },
      userName: {
        editable: false,
        addable: false,
        title: 'Používateľské meno'
      },
      country: {
        title: 'Štát',
        valuePrepareFunction: (cell, row) => {
          return row.places.country;
        }
      },
      region: {
        title: 'Kraj',
        valuePrepareFunction: (cell, row) => {
          return row.places.region;
        }
      },
      district: {
        title: 'Okres',
        valuePrepareFunction: (cell, row) => {
          return row.places.district;
        }
      },
      zip: {
        title: 'PSČ',
        valuePrepareFunction: (cell, row) => {
          return row.places.zip;
        }
      },
      firstName: {
        title: 'Meno'
      },
      lastName: {
        title: 'Priezvisko'
      },
      gender: {
        title: 'Pohlavie'
      },
      balance: {
        title: 'Zostatok'
      },
      tel: {
        title: 'Tel. číslo'
      }
    }
  };

  public error: Error;
  public source: any = LocalDataSource;
  public header: string = 'Používatelia';
  public subscriptions: Subscription[] = [];

  public constructor(private userService: UserService) {
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
      this.userService.getAllDataObservable
        .subscribe((users: User[]) => {
          this.error = null;
          this.source = new LocalDataSource(Object.values(users));
        })
    );

    this.userService.getAll(1, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }
}
