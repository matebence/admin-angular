declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Role} from '../../../../../../../shared/models/services/account/role.model';
import {Account} from '../../../../../../../shared/models/services/account/account.model';

import {RoleService} from '../../../../../services/account-service/role.service';
import {AccountService} from '../../../../../services/account-service/account.service';

@Component({
  selector: 'app-accounts-form',
  templateUrl: './accounts-form.component.html',
  styleUrls: ['./accounts-form.component.css']
})
export class AccountsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/account_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový konto v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Role', link: '/manage/dashboard/services/accounts/roles'}, {title: 'Preferencie', link: '/manage/dashboard/services/accounts/preferences'}, {title: 'Privilégia', link: '/manage/dashboard/services/accounts/privileges'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového konta';

  public roles: Role[];
  private account: Account;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    userName: new FormControl(null, {
      validators: [Validators.pattern('^[A-Za-z_.]+$'), Validators.required],
      updateOn: 'change'
    }),
    email: new FormControl(null, {
      validators: [Validators.email, Validators.required],
      updateOn: 'change'
    }),
    password: new FormControl(null, {
      validators: [Validators.pattern('^(?=.*[a-z])(?=.*\\W)(?=.*[A-Z])(?=.*\\d).+$'), Validators.minLength(8), Validators.maxLength(30), Validators.required],
      updateOn: 'change'
    }),
    confirmPassword: new FormControl(null, {
      validators: [Validators.pattern('^(?=.*[a-z])(?=.*\\W)(?=.*[A-Z])(?=.*\\d).+$'), Validators.minLength(8), Validators.maxLength(30), Validators.required],
      updateOn: 'change'
    }),
    accountRoles: new FormArray([new FormGroup({
      roles: new FormControl(-1, {
        validators: [Validators.required],
        updateOn: 'change'
      })
    })])
  });

  public constructor(private router: Router,
                     private roleService: RoleService,
                     private accountService: AccountService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.roleService.getAll(0, 100)
        .subscribe((roles: Role[]) => {
          this.roles = roles;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.accountService.get(params.id);
        }))
        .subscribe((result: Account) => {
          this.account = result;

          this.formGroup.setValue({userName: this.account.userName, email: this.account.email, password: null, confirmPassword: null, accountRoles: [{roles: -1}]});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie konta';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať konto v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.account == null ? this.onCreate() : this.onUpdate();
    this.account = null;
    return;
  }

  private onCreate(): void {
    this.subscriptions.push(
      this.accountService.create(this.formGroup)
        .pipe(switchMap((result: Account) => {
          return this.accountService.getAll(0, 100);
        }))
        .subscribe((result: Account[]) => {
          this.accountService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const account: Account = {accountId: this.account.accountId, ...this.formGroup.value};
    this.subscriptions.push(
      this.accountService.update(account)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;

          return this.accountService.getAll(0, 100);
        }))
        .subscribe((result: Account[]) => {
          this.accountService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#accountFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/manage/dashboard/services/accounts/main']);
    return;
  }
}
