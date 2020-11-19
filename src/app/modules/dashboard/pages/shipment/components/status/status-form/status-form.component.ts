declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {StatusService} from '../../../../../services/shipment-service/status.service';

import {Status} from '../../../../../../../shared/models/services/shipment/status.model';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/shipment_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový status v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Zásielky', link: '/manage/dashboard/services/shipments/main'}, {title: 'Faktúry', link: '/manage/dashboard/services/shipments/invoices'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového statusu';

  private status: Status;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private statusService: StatusService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.statusService.get(params.id);
        }))
        .subscribe((result: Status) => {
          this.status = result;

          this.formGroup.setValue({name: this.status.name});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie statusu';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať status v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.status == null ? this.onCreate() : this.onUpdate();
    this.status = null;
    return;
  }

  private onCreate(): void {
    let status: Status;
    this.subscriptions.push(
      this.statusService.create(this.formGroup)
        .subscribe((result: Status) => {
          status = result;
          let statuses: Status[] = this.statusService.getGetAllData();
          statuses.unshift(status);
          this.statusService.setGetAllData(statuses);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let status: Status = {_id: this.status._id, ...this.formGroup.value};
    this.subscriptions.push(
      this.statusService.update(status)
        .subscribe((result: boolean) => {
          if (!result) return;

          let statuses: Status[] = this.statusService.getGetAllData().filter(e => e._id != status._id);
          statuses.unshift(status);
          this.statusService.setGetAllData(statuses);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#statusFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/manage/dashboard/services/shipments/status']);
    return;
  }
}
