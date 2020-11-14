declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../../services/user-service/user.service';
import {GenderService} from '../../../../../services/user-service/gender.service';
import {AccountService} from '../../../../../services/account-service/account.service';

import {User} from '../../../../../../../shared/models/services/user/user.model';
import {Gender} from '../../../../../../../shared/models/services/user/gender.model';
import {Account} from '../../../../../../../shared/models/services/account/account.model';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/user_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nového používateľa v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Výplaty', link: '/dashboard/services/users/payouts'}, {title: 'Pohlavia', link: '/dashboard/services/users/genders'}, {title: 'Platby', link: '/dashboard/services/users/payments'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového používateľa';

  private user: User;
  public genders: Gender[];
  public accounts: Account[];
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    accountId: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    firstName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    lastName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    gender: new FormControl(-1, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    balance: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
    tel: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    places: new FormGroup({
      country: new FormControl(null, {
        validators: [Validators.pattern('^[A-Za-z]+$'), Validators.required],
        updateOn: 'change'
      }),
      code: new FormControl(null, {
        validators: [Validators.maxLength(2), Validators.pattern('^[A-Za-z]+$'), Validators.required],
        updateOn: 'change'
      }),
      region: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      district: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      place: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      street: new FormControl(null, {
        validators: [Validators.pattern('^[\\D 0-9]+$'), Validators.required],
        updateOn: 'change'
      }),
      zip: new FormControl(null, {
        validators: [Validators.pattern('^[0-9 ]+$'), Validators.required],
        updateOn: 'change'
      })
    })
  });

  public constructor(private router: Router,
                     private userService: UserService,
                     private genderService: GenderService,
                     private accountService: AccountService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.genderService.getAll(0, 100)
        .subscribe((genders: Gender[]) => {
          this.genders = genders;
        })
    );

    this.subscriptions.push(
      this.accountService.getAll(0, 100)
        .subscribe((accounts: Account[]) => {
          this.accounts = accounts;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.userService.get(params.id);
        }))
        .subscribe((result: User) => {
          this.user = result;

          this.formGroup.setValue({accountId: this.user.accountId, firstName: this.user.firstName, lastName: this.user.lastName, gender: this.user.gender, balance: this.user.balance, tel: this.user.tel, places: {country: this.user.places.country, code: this.user.places.code, region: this.user.places.region, district: this.user.places.district, place: this.user.places.place, street: this.user.places.street, zip: this.user.places.zip}});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie používateľa';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať používateľa v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.user == null ? this.onCreate() : this.onUpdate();
    this.user = null;
    return;
  }

  private onCreate(): void {
    let user: User;
    this.subscriptions.push(
      this.userService.create(this.formGroup)
        .pipe(switchMap((result: User) => {
          user = result;
          return this.userService.get(user.accountId);
        }))
        .subscribe((result: User) => {
          let users: User[] = this.userService.getGetAllData();
          users.unshift(result);
          this.userService.setGetAllData(users);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const user: User = {accountId: this.user.accountId, ...this.formGroup.value};
    this.subscriptions.push(
      this.userService.update(user)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;
          return this.userService.get(user.accountId);
        }))
        .subscribe((result: User) => {
          let users: User[] = this.userService.getGetAllData().filter(e => e.accountId != user.accountId);
          users.unshift(result);
          this.userService.setGetAllData(users);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#userFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/users/main']);
    return;
  }
}
