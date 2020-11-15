declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {AccountService} from '../../../../../services/account-service/account.service';
import {PreferenceService} from '../../../../../services/account-service/preference.service';

import {Account} from '../../../../../../../shared/models/services/account/account.model';
import {Preference} from '../../../../../../../shared/models/services/account/preference.model';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.css']
})
export class PreferencesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/account_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú preferenciu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Kontá', link: '/dashboard/services/accounts/main'}, {title: 'Role', link: '/dashboard/services/accounts/roles'}, {title: 'Privilégia', link: '/dashboard/services/accounts/privileges'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej preferencie';

  public accounts: Account[];
  private preference: Preference;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D\\d]+$'), Validators.required],
      updateOn: 'change'
    }),
    accountPreferences: new FormArray([new FormGroup({
      accounts: new FormGroup({
        accountId: new FormControl(-1, {
          validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
          updateOn: 'change'
        })
      }),
      isSet: new FormControl(null, {
        validators: [Validators.pattern('^true$|^false$')],
        updateOn: 'change'
      }),
      content: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$')],
        updateOn: 'change'
      }),
      value: new FormControl(null, {
        validators: [Validators.pattern('^[0-9.]+$')],
        updateOn: 'change'
      })
    })])
  });

  public constructor(private router: Router,
                     private accountService: AccountService,
                     private activatedRoute: ActivatedRoute,
                     private preferenceService: PreferenceService) {
  }

  public ngOnInit(): void {
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
          return this.preferenceService.get(params.id);
        }))
        .subscribe((result: Preference) => {
          this.preference = result;
          let accountPreferences = [];

          (this.formGroup.controls['accountPreferences'] as FormArray).clear();
          this.preference.accountPreferences.forEach(e => {
            this.onAddPreference();
            accountPreferences.push({
              accounts: {accountId: 1},
              isSet: e.isSet,
              content: e.content,
              value: e.value
            });
          });

          this.formGroup.setValue({name: this.preference.name, accountPreferences: accountPreferences});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie preferencie';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať preferenciu v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.preference == null ? this.onCreate() : this.onUpdate();
    this.preference = null;
    return;
  }

  private onCreate(): void {
    this.subscriptions.push(
      this.preferenceService.create(this.formGroup)
        .pipe(switchMap((result: Preference) => {
          return this.preferenceService.getAll(0, 100);
        }))
        .subscribe((result: Preference[]) => {
          this.preferenceService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const preference: Preference = {preferenceId: this.preference.preferenceId, ...this.formGroup.value};
    this.subscriptions.push(
      this.preferenceService.update(preference)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;

          return this.preferenceService.getAll(0, 100);
        }))
        .subscribe((result: Preference[]) => {
          this.preferenceService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  public onAddPreference(): void {
    let formArray = this.formGroup.controls['accountPreferences'] as FormArray;
    formArray.push(new FormGroup({
      accounts: new FormGroup({
        accountId: new FormControl(-1, {
          validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
          updateOn: 'change'
        })
      }),
      isSet: new FormControl(null, {
        validators: [Validators.pattern('^true$|^false$')],
        updateOn: 'change'
      }),
      content: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$')],
        updateOn: 'change'
      }),
      value: new FormControl(null, {
        validators: [Validators.pattern('^[0-9.]+$')],
        updateOn: 'change'
      })
    }));
    return;
  }

  public onRemovePreference(): void {
    let formArray = this.formGroup.controls['accountPreferences'] as FormArray;
    formArray.removeAt(formArray.length - 1);
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#preferenceFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/accounts/preferences']);
    return;
  }
}
