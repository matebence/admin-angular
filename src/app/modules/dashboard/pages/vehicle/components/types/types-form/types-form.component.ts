declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {TypeService} from '../../../../../services/vehicle-service/type.service';

import {Type} from '../../../../../../../shared/models/services/vehicle/type.model';

@Component({
  selector: 'app-types-form',
  templateUrl: './types-form.component.html',
  styleUrls: ['./types-form.component.css']
})
export class TypesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/vehicle_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový dopravný prostriedok v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Vozidlá', link: '/manage/dashboard/services/vehicles/main'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového typu dopravného prostriedka';

  private type: Type;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private typeService: TypeService,
                     private activatedRoute: ActivatedRoute,) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.typeService.get(params.id);
        }))
        .subscribe((result: Type) => {
          this.type = result;

          if (this.type == null) return;

          this.formGroup.setValue({name: this.type.name});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie typu dopravného prostriedka';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať dopravný prostriedok v aplikácií Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.type == null ? this.onCreate() : this.onUpdate();
    this.type = null;
    return;
  }

  private onCreate(): void {
    let type: Type;
    this.subscriptions.push(
      this.typeService.create(this.formGroup)
        .subscribe((result: Type) => {
          type = result;
          let types: Type[] = this.typeService.getGetAllData();
          types.unshift(type);
          this.typeService.setGetAllData(types);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let type: Type = {_id: this.type._id, ...this.formGroup.value};
    this.subscriptions.push(
      this.typeService.update(type)
        .subscribe((result: boolean) => {
          if (!result) return;

          let types: Type[] = this.typeService.getGetAllData().filter(e => e._id != type._id);
          types.unshift(type);
          this.typeService.setGetAllData(types);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#typeFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/manage/dashboard/services/vehicles/types']);
    return;
  }
}
