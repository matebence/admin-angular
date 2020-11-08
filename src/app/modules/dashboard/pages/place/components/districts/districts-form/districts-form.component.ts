declare const $: any;

import {Observable, Subject, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {RegionService} from '../../../../../services/place-service/region.service';
import {DistrictService} from '../../../../../services/place-service/district.service';

import {Region} from '../../../../../../../shared/models/services/place/region.model';
import {District} from '../../../../../../../shared/models/services/place/district.model';

@Component({
  selector: 'app-districts-form',
  templateUrl: './districts-form.component.html',
  styleUrls: ['./districts-form.component.css']
})
export class DistrictsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/place_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový okres pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Kraje', link: '/dashboard/services/places/table/regions'}, {title: 'Mestá a obce', link: '/dashboard/services/places/table/villages'}];

  public regionSelect: number = 1;
  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového okresu';

  public regions: Region[];
  private district: District;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    vehRegNum: new FormControl(null, {
      validators: [Validators.maxLength(2), Validators.pattern('[A-Z]+'), Validators.required],
      updateOn: 'change'
    }),
    code: new FormControl(null, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    use: new FormControl(1),
    regionId: new FormControl(null, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
  });

  public constructor(private router: Router,
                     private regionService: RegionService,
                     private activatedRoute: ActivatedRoute,
                     private districtService: DistrictService) {
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
        this.district = this.districtService
          .getGetAllData()
          .filter(e => e.id == params.id)
          .pop();

        if (this.district == null) return;
        this.regionSelect = this.district.regionId;
        this.formGroup.setValue({name: this.district.name, vehRegNum: this.district.vehRegNum, code: this.district.code, regionId: this.district.regionId, use: this.district.use});

        this.formButton = 'Aktualizovať';
        this.formTitle = 'Aktualizovanie okresu';
        this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať okres pre aplikáciu Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    if (this.district == null) {
      this.subscriptions.push(
        this.districtService.create(this.formGroup)
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
    } else {
      this.subscriptions.push(
        this.districtService.update({...this.district, ...this.formGroup.value})
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
      this.district = null;
    }
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#districtFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/places/table/districts']);
    return;
  }
}
