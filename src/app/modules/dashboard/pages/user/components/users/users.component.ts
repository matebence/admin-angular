declare const $: any;

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

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public source: LocalDataSource;
  public header: string = 'Používatelia';

  public subscriptions: Subscription[] = [];

  public settings: any = {
    ...tableConfig,
    columns: {
      userId: {
        title: 'ID',
        addable: false,
        editable: false
      },
      accountId: {
        title: 'ID používateľa'
      },
      email: {
        title: 'Email',
        addable: false,
        editable: false
      },
      userName: {
        title: 'Používateľské meno',
        addable: false,
        editable: false
      },
      places: {
        title: 'Miesto',
        valuePrepareFunction: (places) => {
          return `${places.country}, ${places.region}, ${places.district}`;
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

  public constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.errorDataObservable
        .subscribe((error: Error) => {
          $('#userModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = 'Synchronizovať zoznam';
        })
    );

    this.subscriptions.push(
      this.userService.getAllDataObservable
        .subscribe((users: User[]) => {
          this.source = new LocalDataSource(users);
        })
    );

    this.userService.getAll(1, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableResult(event: any): void {
    this.subscriptions.push(event.source.onAddedSource.subscribe(this.onDataAdded.bind(this)));
    this.subscriptions.push(event.source.onUpdatedSource.subscribe(this.onDataUpdated.bind(this)));
    this.subscriptions.push(event.source.onRemovedSource.subscribe(this.onDataRemoved.bind(this)));
    return;
  }

  public onModalResult(event): void {
    if (event) this.userService.getAll(1, 100);
    return;
  }

  private onDataAdded(data: User): void {
    return;
  }

  private onDataUpdated(data: User): void {
    return;
  }

  private onDataRemoved(data: User): void {
    this.userService.delete(data.accountId);
    return;
  }
}
