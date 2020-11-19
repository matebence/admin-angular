declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {GenderService} from '../../../../../services/user-service/gender.service';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Gender} from '../../../../../../../shared/models/services/user/gender.model';

@Component({
  selector: 'app-genders-form',
  templateUrl: './genders-form.component.html',
  styleUrls: ['./genders-form.component.css']
})
export class GendersFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/user_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový názov pohlavia v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Platby', link: '/dashboard/services/users/payments'}, {title: 'Výplaty', link: '/dashboard/services/users/payouts'}, {title: 'Používatelia', link: '/dashboard/services/users/main'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového názvu pohlavia';

  private gender: Gender;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private genderService: GenderService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.genderService.get(params.id);
        }))
        .subscribe((result: Gender) => {
          this.gender = result;

          this.formGroup.setValue({name: this.gender.name});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie názov pohlavia';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať názov pohlavia v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.gender == null ? this.onCreate() : this.onUpdate();
    this.gender = null;
    return;
  }

  private onCreate(): void {
    let gender: Gender;
    this.subscriptions.push(
      this.genderService.create(this.formGroup)
        .subscribe((result: Gender) => {
          gender = result;
          let genders: Gender[] = this.genderService.getGetAllData();
          genders.unshift(gender);
          this.genderService.setGetAllData(genders);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let gender: Gender = {genderId: this.gender.genderId, ...this.formGroup.value};
    this.subscriptions.push(
      this.genderService.update(gender)
        .subscribe((result: boolean) => {
          if (!result) return;

          let genders: Gender[] = this.genderService.getGetAllData().filter(e => e.genderId != gender.genderId);
          genders.unshift(gender);
          this.genderService.setGetAllData(genders);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#genderFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/users/genders']);
    return;
  }
}
