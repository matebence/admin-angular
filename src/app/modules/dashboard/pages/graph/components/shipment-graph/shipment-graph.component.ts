import {Label} from 'ng2-charts';
import groupBy from 'lodash/groupBy';
import {ChartDataSets} from 'chart.js';
import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {ShipmentService} from '../../../../services/shipment-service/shipment.service';

import {Shipment} from '../../../../../../shared/models/services/shipment/shipment.model';

@Component({
  selector: 'app-shipment-graph',
  templateUrl: './shipment-graph.component.html',
  styleUrls: ['./shipment-graph.component.css']
})
export class ShipmentGraphComponent implements OnInit, OnDestroy {

  public illustration: string = 'assets/img/graph_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Máte otvorenú analytickú časť aplikácie, kďe možete vidieť počet doručených balíkov pre daného kuriéra a zásielky podľa ich statusu.';
  public assistentOptions: any = [{title: 'Používatelia', link: '/dashboard/services/graph/users'}, {title: 'Balíky', link: '/dashboard/services/graph/parcels'}, {title: 'Krajiny', link: '/dashboard/services/graph/places'}];

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  public pieChartData: number[] = [];
  public pieChartLabels: Label[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(private shipmentService: ShipmentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.shipmentService.getAllDataObservable
        .subscribe((shipments: Shipment[]) => {
          let data: any = groupBy(shipments, n => n.status.name);
          this.pieChartLabels = Object.keys(data);
          this.pieChartData = Object.keys(data).map(e => data[e].length);

          data = groupBy(shipments, n => n.courier.userName);
          this.barChartData = Object.keys(data).map(e => {return {data: [data[e].length], label: data[e][0].courier.userName}});
          this.barChartLabels = ['Kuriér'];
        })
    );

    this.subscriptions.push(
      this.shipmentService.getAll(1, 100)
        .subscribe((shipments: Shipment[]) => {
          this.shipmentService.setGetAllData(shipments);
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
      this.shipmentService.getAll(1, 100)
        .subscribe((shipments: Shipment[]) => {
          this.shipmentService.setGetAllData(shipments);
        })
    );
    return;
  }
}
