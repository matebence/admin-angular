declare const $: any;

import {Observable, Subject, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {environment} from '../../../../../../../../environments/environment';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {User} from '../../../../../../../shared/models/services/user/user.model';
import {Type} from '../../../../../../../shared/models/services/vehicle/type.model';
import {Vehicle} from '../../../../../../../shared/models/services/vehicle/vehicle.model';

import {UserService} from '../../../../../services/user-service/user.service';
import {TypeService} from '../../../../../services/vehicle-service/type.service';
import {VehicleService} from '../../../../../services/vehicle-service/vehicle.service';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/vehicle_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový doprvaný prostriedok pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Typy', link: '/dashboard/services/vehicles/table/types'}];

  public courierSelect: number = 4;
  public typeSelect: string = '5ede132ad2316a1df0dd95f0';
  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového dopravného prostriedka';

  public types: Type[];
  public couriers: User[];
  private vehicle: Vehicle;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    courier: new FormControl(null, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    type: new FormControl(null, {
      validators: [Validators.pattern('^[0-9a-fA-F]{24}$'), Validators.required],
      updateOn: 'change'
    }),
  });

  public constructor(private router: Router,
                     private userService: UserService,
                     private typeService: TypeService,
                     private vehicleService: VehicleService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.typeService.getAllDataObservable
        .subscribe((types: Type[]) => {
          this.types = types;
        })
    );

    this.typeService.getAll(1, 100);

    this.subscriptions.push(
      this.userService.searchDataObservable
        .subscribe((users: User[]) => {
          this.couriers = users;
        })
    );

    this.userService.search({pagination: {pageNumber: 0, pageSize: 100}, search: {roles: environment.APP_ROLE_COURIER}});

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.vehicle = this.vehicleService
          .getGetAllData()
          .filter(e => e._id == params.id)
          .pop();

        if (this.vehicle == null) return;

        this.formGroup.setValue({name: this.vehicle.name, courier: this.vehicle.courier, type: this.vehicle.type});

        this.typeSelect = this.vehicle.type._id;
        this.courierSelect = this.vehicle.courier.courierId;

        this.formButton = 'Aktualizovať';
        this.formTitle = 'Aktualizovanie dopravného prostriedka';
        this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať dopravný prostriedok pre aplikáciu Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    if (this.vehicle == null) {
      this.subscriptions.push(
        this.vehicleService.create(this.formGroup)
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
    } else {
      this.subscriptions.push(
        this.vehicleService.update({...this.vehicle, ...this.formGroup.value})
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
      this.vehicle = null;
    }
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#vehicleFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/vehicles/table']);
    return;
  }
}
