declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import roleTableConfig from '../../../../../../configs/js/account/table.role.config.js';

import {Role} from '../../../../../../shared/models/services/account/role.model';

import {RoleService} from '../../../../services/account-service/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Role';
  private subscriptions: Subscription[] = [];

  public settings: any = roleTableConfig;

  public constructor(private router: Router,
                     private roleService: RoleService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.roleService.errorDataObservable
        .subscribe((error: Error) => {
          $('#roleModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.roleService.getAllDataObservable
        .subscribe((roles: Role[]) => {
          this.source = new LocalDataSource(roles);
        })
    );

    this.subscriptions.push(
      this.roleService.getAll(0, 100)
        .subscribe((roles: Role[]) => {
          this.roleService.setGetAllData(roles);
          this.source = new LocalDataSource(roles);
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
    $('#roleModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().roleId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.roleService.delete(this.row.getData().roleId)
      .subscribe(result => {
        if (!result) return;

        let roles: Role[] = this.roleService.getGetAllData().filter(e => e.roleId != this.row.getData().roleId);
        this.roleService.setGetAllData(roles);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
