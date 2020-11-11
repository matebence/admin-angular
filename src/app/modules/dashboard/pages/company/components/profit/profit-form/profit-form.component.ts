import {Observable, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

@Component({
  selector: 'app-profit-form',
  templateUrl: './profit-form.component.html',
  styleUrls: ['./profit-form.component.css']
})
export class ProfitFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/profit_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte nastaviť profit firmy (+ cena za každý balík)';
  public assistentOptions: any = [{title: 'Sklady', link: '/dashboard/services/company/warehouses'}];

  public formButton: string = 'Nastaviť';
  public formTitle: string = 'Nastavenie profitu firmy';

  private subscriptions: Subscription[] = [];

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
