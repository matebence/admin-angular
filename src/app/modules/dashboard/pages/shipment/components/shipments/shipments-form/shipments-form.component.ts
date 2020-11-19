declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {User} from '../../../../../../../shared/models/services/user/user.model';
import {Parcel} from '../../../../../../../shared/models/services/parcel/parcel.model';
import {Status} from '../../../../../../../shared/models/services/shipment/status.model';
import {Shipment} from '../../../../../../../shared/models/services/shipment/shipment.model';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {environment} from '../../../../../../../../environments/environment';

import {UserService} from '../../../../../services/user-service/user.service';
import {ParcelService} from '../../../../../services/parcel-service/parcel.service';
import {StatusService} from '../../../../../services/shipment-service/status.service';
import {ShipmentService} from '../../../../../services/shipment-service/shipment.service';

@Component({
  selector: 'app-shipments-form',
  templateUrl: './shipments-form.component.html',
  styleUrls: ['./shipments-form.component.css']
})
export class ShipmentsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/shipment_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú zásielku v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Statusy', link: '/manage/dashboard/services/shipments/status'}, {title: 'Faktúry', link: '/manage/dashboard/services/shipments/invoices'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej zásielky';

  public users: User[];
  public statuses: Status[];
  public parcels: Parcel[];
  private shipment: Shipment;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    shipments: new FormArray([new FormGroup({
      courier: new FormControl(-1, {
        validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
        updateOn: 'change'
      }),
      parcelId: new FormControl(-1, {
        validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
        updateOn: 'change'
      }),
      from: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      to: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      status: new FormControl(-1, {
        validators: [Validators.pattern('^[0-9a-fA-F]{24}$'), Validators.required],
        updateOn: 'change'
      }),
      price: new FormControl(null, {
        validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
        updateOn: 'change'
      }),
      express: new FormControl(false, {
        validators: [Validators.required],
        updateOn: 'change'
      })
    })])
  });

  public constructor(private router: Router,
                     private userService: UserService,
                     private statusService: StatusService,
                     private parcelService: ParcelService,
                     private activatedRoute: ActivatedRoute,
                     private shipmentService: ShipmentService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.search({
        pagination: {pageNumber: 0, pageSize: 100},
        search: {roles: environment.APP_ROLE_COURIER}
      })
        .subscribe((users: User[]) => {
          this.users = users;
        })
    );

    this.subscriptions.push(
      this.statusService.getAll(1, 100)
        .subscribe((statuses: Status[]) => {
          this.statuses = statuses;
        })
    );

    this.subscriptions.push(
      this.parcelService.getAll(1, 100)
        .subscribe((parcels: Parcel[]) => {
          this.parcels = parcels;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.shipmentService.get(params.id);
        }))
        .subscribe((result: Shipment) => {
          this.shipment = result;

          this.formGroup.get('shipments').setValue([{courier: this.shipment.courier.courierId, parcelId: this.shipment.parcelId, from: this.shipment.from, to: this.shipment.to, status: this.shipment.status._id, price: this.shipment.price, express: this.shipment.express}]);

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie zásielky';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať zásielku v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.shipment == null ? this.onCreate() : this.onUpdate();
    this.shipment = null;
    return;
  }

  public onCountryPrefix(input: string): void {
    if (input === 'from') {
      this.formGroup.get('shipments').patchValue([{from: 'Slovakia, '}])
    } else if (input === 'to') {
      this.formGroup.get('shipments').patchValue([{to: 'Slovakia, '}])
    }
  }

  private onCreate(): void {
    this.subscriptions.push(
      this.shipmentService.create(this.formGroup)
        .pipe(switchMap((result: Shipment[]) => {
          return this.shipmentService.getAll(1, 100);
        }))
        .subscribe((result: Shipment[]) => {
          this.shipmentService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const shipment: Shipment = {_id: this.shipment._id, ...this.formGroup.value.shipments.pop()};
    this.subscriptions.push(
      this.shipmentService.update(shipment)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;

          return this.shipmentService.getAll(1, 100);
        }))
        .subscribe((result: Shipment[]) => {
          this.shipmentService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#shipmentFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/manage/dashboard/services/shipments/main']);
    return;
  }
}
