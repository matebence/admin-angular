declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import userTableConfig from '../../../../../../configs/js/user/table.user.config.js';

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

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Používatelia';
  private subscriptions: Subscription[] = [];

  public settings: any = userTableConfig;

  public constructor(private router: Router,
                     private userService: UserService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.errorDataObservable
        .subscribe((error: Error) => {
          $('#userModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.userService.getAllDataObservable
        .subscribe((users: User[]) => {
          this.source = new LocalDataSource(users);
        })
    );

    this.subscriptions.push(
      this.userService.getAll(0, 100)
        .subscribe((users: User[]) => {
          this.userService.setGetAllData(users);
          this.source = new LocalDataSource(users);
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: boolean): void {
    if (row) this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#userModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().accountId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.userService.delete(this.row.getData().accountId)
      .subscribe(result => {
        if (!result) return;

        let users: User[] = this.userService.getGetAllData().filter(e => e.accountId != this.row.getData().accountId);
        this.userService.setGetAllData(users);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
