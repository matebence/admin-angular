import {Label} from 'ng2-charts';
import groupBy from 'lodash/groupBy';
import {ChartDataSets} from 'chart.js';
import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {VehicleService} from '../../../../services/vehicle-service/vehicle.service';

import {Vehicle} from '../../../../../../shared/models/services/vehicle/vehicle.model';

@Component({
  selector: 'app-vehicle-graph',
  templateUrl: './vehicle-graph.component.html',
  styleUrls: ['./vehicle-graph.component.css']
})
export class VehicleGraphComponent implements OnInit, OnDestroy {

  public illustration: string = '../../../../../../../../assets/img/graph_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Máte otvorenú analytickú časť aplikácie, kďe možete vidieť počet dopravných prostriedkov pre daného kuriéra a typy dopravných prostriedkov.';
  public assistentOptions: any = [{title: 'Používatelia', link: '/dashboard/services/graph/users'}, {title: 'Zásielky', link: '/dashboard/services/graph/shipments'}, {title: 'Balíky', link: '/dashboard/services/graph/parcels'}];

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  public pieChartData: number[] = [];
  public pieChartLabels: Label[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(private vehicleService: VehicleService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.vehicleService.getAllDataObservable
        .subscribe((vehicles: Vehicle[]) => {
          let data: any = groupBy(vehicles, n => n.type.name);
          this.pieChartLabels = Object.keys(data);
          this.pieChartData = Object.keys(data).map(e => data[e].length);

          data = groupBy(vehicles, n => n.courier.userName);
          this.barChartData = Object.keys(data).map(e => {return {data: [data[e].length], label: data[e][0].courier.userName}});
          this.barChartLabels = ['Kuriér'];
        })
    );

    this.subscriptions.push(
      this.vehicleService.getAll(1, 100)
        .subscribe((vehicles: Vehicle[]) => {
          this.vehicleService.setGetAllData(vehicles);
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
      this.vehicleService.getAll(1, 100)
        .subscribe((vehicles: Vehicle[]) => {
          this.vehicleService.setGetAllData(vehicles);
        })
    );
    return;
  }
}
