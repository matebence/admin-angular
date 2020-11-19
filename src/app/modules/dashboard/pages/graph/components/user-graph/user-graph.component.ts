import {Label} from 'ng2-charts';
import groupBy from 'lodash/groupBy';
import {ChartDataSets} from 'chart.js';
import {Subscription} from 'rxjs/index';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {UserService} from '../../../../services/user-service/user.service';

import {User} from '../../../../../../shared/models/services/user/user.model';

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit, OnDestroy {

  public illustration: string = 'assets/img/graph_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Máte otvorenú analytickú časť aplikácie, kďe možete vidieť zostatok použivateľov a ich aktuálny počet podľa krajov.';
  public assistentOptions: any = [{title: 'Zásielky', link: '/dashboard/services/graph/shipments'}, {title: 'Balíky', link: '/dashboard/services/graph/parcels'}, {title: 'Krajiny', link: '/dashboard/services/graph/places'}];

  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];

  public pieChartData: number[] = [];
  public pieChartLabels: Label[] = [];

  private subscriptions: Subscription[] = [];

  public constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getAllDataObservable
        .subscribe((users: User[]) => {
          let data: any = groupBy(users, n => n.places.region);
          this.pieChartLabels = Object.keys(data);
          this.pieChartData = Object.keys(data).map(e => data[e].length);

          data = groupBy(users, n => n.userName);
          this.barChartData = Object.keys(data).map(e => {return {data: [data[e][0].balance], label: data[e][0].userName}});
          this.barChartLabels = ['Používateľ'];
        })
    );

    this.subscriptions.push(
      this.userService.getAll(0, 100)
        .subscribe((users: User[]) => {
          this.userService.setGetAllData(users);
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
      this.userService.getAll(0, 100)
        .subscribe((users: User[]) => {
          this.userService.setGetAllData(users);
        })
    );
    return;
  }
}
