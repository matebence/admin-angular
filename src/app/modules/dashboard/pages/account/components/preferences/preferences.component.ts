declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import preferenceTableConfig from '../../../../../../configs/js/account/table.preference.config.js';

import {Preference} from '../../../../../../shared/models/services/account/preference.model';

import {PreferenceService} from '../../../../services/account-service/preference.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Preferencie';
  private subscriptions: Subscription[] = [];

  public settings: any = preferenceTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private preferenceService: PreferenceService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.preferenceService.errorDataObservable
        .subscribe((error: Error) => {
          $('#preferenceModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.preferenceService.getAllDataObservable
        .subscribe((preferences: Preference[]) => {
          this.source = new LocalDataSource(preferences);
        })
    );

    this.subscriptions.push(
      this.preferenceService.getAll(0, 100)
        .subscribe((preferences: Preference[]) => {
          this.preferenceService.setGetAllData(preferences);
          this.source = new LocalDataSource(preferences);
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
    $('#preferenceModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().preferenceId], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.preferenceService.delete(this.row.getData().preferenceId)
      .subscribe(result => {
        if (!result) return;

        let preferences: Preference[] = this.preferenceService.getGetAllData().filter(e => e.preferenceId != this.row.getData().preferenceId);
        this.preferenceService.setGetAllData(preferences);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
