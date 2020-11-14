declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {PriceService} from '../../../../../services/shipment-service/price.service';

import {Price} from '../../../../../../../shared/models/services/shipment/price.model';

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

  private profit: Price;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    price: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
  });

  public constructor(private router: Router,
                     private priceService: PriceService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.priceService.get(params.id);
        }))
        .subscribe((result: Price) => {
          this.profit = result;
          this.formGroup.setValue({price: this.profit.price});
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    let profit: Price = {_id: this.profit._id, ...this.formGroup.value};
    this.subscriptions.push(
      this.priceService.update(profit)
        .subscribe((result: boolean) => {
          if (!result) return;
          this.priceService.setGetData(profit);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#profitFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/company/profit']);
    return;
  }
}
