declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import districtTableConfig from '../../../../../../configs/js/place/table.district.config.js';

import {District} from '../../../../../../shared/models/services/place/district.model';

import {DistrictService} from '../../../../services/place-service/district.service';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Okresy';
  private subscriptions: Subscription[] = [];

  public settings: any = districtTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private districtService: DistrictService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.districtService.errorDataObservable
        .subscribe((error: Error) => {
          $('#districtModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.districtService.getAllDataObservable
        .subscribe((districts: District[]) => {
          this.source = new LocalDataSource(districts);
        })
    );

    this.subscriptions.push(
      this.districtService.getAll(1, 100)
        .subscribe((districts: District[]) => {
          this.districtService.setGetAllData(districts);
          this.source = new LocalDataSource(districts);
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
    $('#districtModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.districtService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let districts: District[] = this.districtService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.districtService.setGetAllData(districts);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
