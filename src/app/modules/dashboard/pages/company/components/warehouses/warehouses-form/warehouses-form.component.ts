declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {RegionService} from '../../../../../services/place-service/region.service';
import {WarehouseService} from '../../../../../services/warehouse-service/warehouse.service';

import {Region} from '../../../../../../../shared/models/services/place/region.model';
import {Warehouse} from '../../../../../../../shared/models/services/warehouse/warehouse.model';

@Component({
  selector: 'app-warehouses-form',
  templateUrl: './warehouses-form.component.html',
  styleUrls: ['./warehouses-form.component.css']
})
export class WarehousesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/warehouse_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový sklad pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Profit', link: '/dashboard/services/company/profit'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového skladu';

  public regions: Region[];
  private warehouse: Warehouse;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    regions: new FormControl([], {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D 0-9]+$'), Validators.required],
      updateOn: 'change'
    }),
    country: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    address: new FormControl(null, {
      validators: [Validators.pattern('^[\\D 0-9]+$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private regionService: RegionService,
                     private activatedRoute: ActivatedRoute,
                     private warehouseService: WarehouseService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.regionService.getAll(1, 100)
        .subscribe((regions: Region[]) => {
          this.regions = regions;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.warehouseService.get(params.id);
        }))
        .subscribe((result: Warehouse) => {
          this.warehouse = result;

          const regions: number[] = [];
          this.warehouse.regions.forEach(e => regions.push(e.id));
          this.formGroup.setValue({regions: regions, name: this.warehouse.name, country: this.warehouse.country, address: this.warehouse.address});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie skladu';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať sklad pre aplikáciu Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.warehouse == null ? this.onCreate() : this.onUpdate();
    this.warehouse = null;
    return;
  }

  private onCreate(): void {
    let warehouse: Warehouse;
    this.subscriptions.push(
      this.warehouseService.create(this.formGroup)
        .pipe(switchMap((result: Warehouse) => {
          warehouse = result;
          return this.regionService.getAll(1, 100);
        }))
        .subscribe((result: Region[]) => {
          let warehouses: Warehouse[] = this.warehouseService.getGetAllData();
          warehouse.regions = result.filter(e => warehouse.regions.includes(e.id));
          warehouses.unshift(warehouse);

          this.warehouseService.setGetAllData(warehouses);
          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let warehouse: Warehouse = {_id: this.warehouse._id, ...this.formGroup.value};
    this.subscriptions.push(
      this.warehouseService.update(warehouse)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;
          return this.regionService.getAll(1, 100);
        }))
        .subscribe((result: Region[]) => {
          let warehouses: Warehouse[] = this.warehouseService.getGetAllData().filter(e => e._id != warehouse._id);
          warehouse.regions = result.filter(e => warehouse.regions.includes(e.id));
          warehouses.unshift(warehouse);

          this.warehouseService.setGetAllData(warehouses);
          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#warehouseFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/company/warehouses']);
    return;
  }
}
