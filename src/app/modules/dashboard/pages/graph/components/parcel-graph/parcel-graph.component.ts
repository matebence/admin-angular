import {Label} from 'ng2-charts';
import groupBy from 'lodash/groupBy';
import {ChartDataSets} from 'chart.js';
import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {ParcelService} from '../../../../services/parcel-service/parcel.service';

import {Parcel} from '../../../../../../shared/models/services/parcel/parcel.model';

@Component({
  selector: 'app-parcel-graph',
  templateUrl: './parcel-graph.component.html',
  styleUrls: ['./parcel-graph.component.css']
})
export class ParcelGraphComponent implements OnInit, OnDestroy {

  public illustration: string = 'assets/img/graph_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Máte otvorenú analytickú časť aplikácie, kďe možete vidieť počet odoslaných balíkov podľa používateľov a baliky podľa ich kategórie.';
  public assistentOptions: any = [{title: 'Krajiny', link: '/dashboard/services/graph/places'}, {title: 'Vozidlá', link: '/dashboard/services/graph/vehicles'}, {title: 'Používatelia', link: '/dashboard/services/graph/users'}];

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  public pieChartData: number[] = [];
  public pieChartLabels: Label[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(private parcelService: ParcelService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.parcelService.getAllDataObservable
        .subscribe((parcels: Parcel[]) => {
          let data: any = groupBy(parcels, n => n.category.name);
          this.pieChartLabels = Object.keys(data);
          this.pieChartData = Object.keys(data).map(e => data[e].length);

          data = groupBy(parcels, n => n.sender.name);
          this.barChartData = Object.keys(data).map(e => {return {data: [data[e].length], label: data[e][0].sender.name}});
          this.barChartLabels = ['Odosielateľ'];
        })
    );

    this.subscriptions.push(
      this.parcelService.getAll(1, 100)
        .subscribe((parcels: Parcel[]) => {
          this.parcelService.setGetAllData(parcels);
        })
    );
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSynchronize(): void {
    this.subscriptions.push(
      this.parcelService.getAll(1, 100)
        .subscribe((parcels: Parcel[]) => {
          this.parcelService.setGetAllData(parcels);
        })
    );
    return;
  }
}
