declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import accountTableConfig from '../../../../../../configs/js/account/table.account.config.js';

import {Account} from '../../../../../../shared/models/services/account/account.model';

import {AccountService} from '../../../../services/account-service/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Kontá';
  private subscriptions: Subscription[] = [];

  public settings: any = accountTableConfig;

  public constructor(private accountService: AccountService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.accountService.errorDataObservable
        .subscribe((error: Error) => {
          $('#accountModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.accountService.getAllDataObservable
        .subscribe((accounts: Account[]) => {
          this.source = new LocalDataSource(accounts);
        })
    );

    this.accountService.getAll(0, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: Boolean): void {
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#accountModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.accountService.delete(this.row.getData().accountId)
      .subscribe(result => {
        if (!result) return;
        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
