import {Observable, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/place_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový kraj pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Okresy', link: '/dashboard/services/places/table/districts'}, {title: 'Mestá a obce', link: '/dashboard/services/places/table/villages'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového kraja';

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
