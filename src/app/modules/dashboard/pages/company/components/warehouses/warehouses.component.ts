declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import warehouseTableConfig from '../../../../../../configs/js/company/table.warehouse.config.js';

import {Warehouse} from '../../../../../../shared/models/services/warehouse/warehouse.model';

import {WarehouseService} from '../../../../services/warehouse-service/warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Sklady';
  private subscriptions: Subscription[] = [];

  public settings: any = warehouseTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private warehouseService: WarehouseService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.warehouseService.errorDataObservable
        .subscribe((error: Error) => {
          $('#warehouseModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.warehouseService.getAllDataObservable
        .subscribe((warehouses: Warehouse[]) => {
          this.source = new LocalDataSource(warehouses);
        })
    );

    this.subscriptions.push(
      this.warehouseService.getAll(1, 100)
        .subscribe((warehouses: Warehouse[]) => {
          this.warehouseService.setGetAllData(warehouses);
          this.source = new LocalDataSource(warehouses);
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
    $('#warehouseModal').modal('show');
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
    setTimeout(() => this.warehouseService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;

        let warehouse: Warehouse[] = this.warehouseService.getGetAllData().filter(e => e._id != this.row.getData()._id);
        this.warehouseService.setGetAllData(warehouse);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
