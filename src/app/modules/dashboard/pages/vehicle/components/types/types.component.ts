declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import typeTableConfig from '../../../../../../configs/js/vehicle/table.type.config.js';

import {Type} from '../../../../../../shared/models/services/vehicle/type.model';

import {TypeService} from '../../../../services/vehicle-service/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Typy';
  private subscriptions: Subscription[] = [];

  public settings: any = typeTableConfig;

  public constructor(private router: Router,
                     private typeService: TypeService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.typeService.errorDataObservable
        .subscribe((error: Error) => {
          $('#typeModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.typeService.getAllDataObservable
        .subscribe((types: Type[]) => {
          this.source = new LocalDataSource(types);
        })
    );

    this.typeService.getAll(1, 100);
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: Boolean): void {
    if (row) this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#typeModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData()._id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.typeService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;
        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
