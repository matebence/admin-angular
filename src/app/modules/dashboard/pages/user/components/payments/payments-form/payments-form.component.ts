import {Refund} from "../../../../../../../shared/models/services/user/refund.model";
declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {RefundService} from '../../../../../services/user-service/refund.service';
import {PaymentService} from '../../../../../services/user-service/payment.service';

import {Payment} from '../../../../../../../shared/models/services/user/payment.model';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.css']
})
export class PaymentsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/user_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať platbu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Výplaty', link: '/manage/dashboard/services/users/payouts'}, {title: 'Pohlavia', link: '/manage/dashboard/services/users/genders'}, {title: 'Používatelia', link: '/manage/dashboard/services/users/main'}];

  public formButton: string = 'Aktualizovať';
  public formTitle: string = 'Aktualizovanie platby';

  private payment: Payment;
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
    creditCard: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    charge: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    amount: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    currency: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    refunded: new FormControl(null, {
      validators: [Validators.pattern('^true$|^false$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private refundService: RefundService,
                     private paymentService: PaymentService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.paymentService.get(params.id);
        }))
        .subscribe((result: Payment) => {
          this.payment = result;

          this.formGroup.setValue({users: {firstName: this.payment.users.firstName, lastName: this.payment.users.lastName, places: {country: this.payment.users.places.country, place: this.payment.users.places.place, street: this.payment.users.places.street}}, creditCard: this.payment.creditCard, charge: this.payment.charge, amount: this.payment.amount, currency: this.payment.currency, refunded: this.payment.refunded});
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    const payment: Payment = {paymentId: this.payment.paymentId, ...this.formGroup.value};
    this.subscriptions.push(
      this.paymentService.update(payment)
        .pipe(switchMap((result: boolean) => {
          if (!result || !payment.refunded) return EMPTY;

          const refund: Refund = {users: {accountId: payment.users.accountId}, creditCard: payment.creditCard, expMonth: payment.expMonth, expYear: payment.expYear, cvc: payment.cvc, amount: payment.amount, charge: payment.charge, currency: payment.currency};
          return this.refundService.create(refund)
        }))
        .subscribe((result: Refund) => {
          let payments: Payment[] = this.paymentService.getGetAllData().filter(e => e.paymentId != payment.paymentId);
          payments.unshift(payment);
          this.paymentService.setGetAllData(payments);

          this.formGroup.reset();
          this.router.navigate(['/manage/dashboard/services/users/payments']);
        })
    );
    this.payment = null;
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#paymentFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }
}
