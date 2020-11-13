declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import privilegeTableConfig from '../../../../../../configs/js/account/table.privilege.config.js';

import {Privilege} from '../../../../../../shared/models/services/account/privilege.model';

import {PrivilegeService} from '../../../../services/account-service/prvilege.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Privilégia';
  private subscriptions: Subscription[] = [];

  public settings: any = privilegeTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private privilegeService: PrivilegeService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.privilegeService.errorDataObservable
        .subscribe((error: Error) => {
          $('#privilegeModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.privilegeService.getAllDataObservable
        .subscribe((privileges: Privilege[]) => {
          this.source = new LocalDataSource(privileges);
        })
    );

    this.subscriptions.push(
      this.privilegeService.getAll(0, 100)
        .subscribe((privileges: Privilege[]) => {
          this.privilegeService.setGetAllData(privileges);
          this.source = new LocalDataSource(privileges);
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
    $('#privilegeModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().privilegeId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.privilegeService.delete(this.row.getData().privilegeId)
      .subscribe(result => {
        if (!result) return;

        let privileges: Privilege[] = this.privilegeService.getGetAllData().filter(e => e.privilegeId != this.row.getData().privilegeId);
        this.privilegeService.setGetAllData(privileges);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
