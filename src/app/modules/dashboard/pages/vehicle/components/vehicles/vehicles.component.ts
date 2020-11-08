declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import vehicleTableConfig from '../../../../../../configs/js/vehicle/table.vehicle.config.js';

import {Vehicle} from '../../../../../../shared/models/services/vehicle/vehicle.model';

import {VehicleService} from '../../../../services/vehicle-service/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Vozidlá';
  private subscriptions: Subscription[] = [];

  public settings: any = vehicleTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private vehicleService: VehicleService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.vehicleService.errorDataObservable
        .subscribe((error: Error) => {
          $('#vehicleModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zrušiť';
          this.pozitiveButton = 'Zatvoriť';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.vehicleService.getAllDataObservable
        .subscribe((vehicles: Vehicle[]) => {
          this.source = new LocalDataSource(vehicles);
        })
    );

    this.vehicleService.getAll(1, 100);
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
    $('#vehicleModal').modal('show');
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
    setTimeout(() => this.vehicleService.delete(this.row.getData()._id)
      .subscribe(result => {
        if (!result) return;

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
