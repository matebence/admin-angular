declare const $: any;

import {Observable, Subject, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
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

  public regionSelect: number[] = [1];
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
      this.regionService.getAllDataObservable
        .subscribe((regions: Region[]) => {
          this.regions = regions;
        })
    );

    this.regionService.getAll(1, 100);

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.warehouse = this.warehouseService
          .getGetAllData()
          .filter(e => e._id == params.id)
          .pop();

        if (this.warehouse == null) return;
        this.regionSelect = [];
        this.warehouse.regions.forEach(e => this.regionSelect.push(e.id));
        this.formGroup.setValue({regions: this.warehouse.regions, name: this.warehouse.name, country: this.warehouse.country, address: this.warehouse.address});

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
    if (this.warehouse == null) {
      this.subscriptions.push(
        this.warehouseService.create(this.formGroup)
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
    } else {
      this.subscriptions.push(
        this.warehouseService.update({...this.warehouse, ...this.formGroup.value})
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
      this.warehouse = null;
    }
    return;
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
