declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PayoutService} from '../../../../../services/user-service/payout.service';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Payout} from '../../../../../../../shared/models/services/user/payout.model';

@Component({
  selector: 'app-payouts-form',
  templateUrl: './payouts-form.component.html',
  styleUrls: ['./payouts-form.component.css']
})
export class PayoutsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/user_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať výplatu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Platby', link: '/dashboard/services/users/payments'}, {title: 'Pohlavia', link: '/dashboard/services/users/genders'}, {title: 'Používatelia', link: '/dashboard/services/users/main'}];

  public formButton: string = 'Aktualizovať';
  public formTitle: string = 'Aktualizovanie výplaty';

  private payout: Payout;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    users: new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      places: new FormGroup({
        country: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'change'
        }),
        place: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'change'
        }),
        street: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'change'
        })
      })
    }),
    iban: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    amount: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    accapted: new FormControl(null, {
      validators: [Validators.pattern('^true$|^false$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private payoutService: PayoutService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.payoutService.get(params.id);
        }))
        .subscribe((result: Payout) => {
          this.payout = result;
          this.formGroup.setValue({users: {firstName: this.payout.users.firstName, lastName: this.payout.users.lastName, places: {country: this.payout.users.places.country, place: this.payout.users.places.place, street: this.payout.users.places.street}}, iban: this.payout.iban, amount: this.payout.amount, accapted: this.payout.accapted});
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    const payout: Payout = {payoutId: this.payout.payoutId, ...this.formGroup.value};
    this.subscriptions.push(
      this.payoutService.update(payout)
        .subscribe((result: boolean) => {
          if (!result) return;

          let payouts: Payout[] = this.payoutService.getGetAllData().filter(e => e.payoutId != payout.payoutId);
          payouts.unshift(payout);
          this.payoutService.setGetAllData(payouts);

          this.formGroup.reset();
          this.router.navigate(['/dashboard/services/users/payouts']);
        })
    );
    this.payout = null;
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#payoutFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }
}
