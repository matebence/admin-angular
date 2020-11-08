declare const $: any;

import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Region} from '../../../../../../../shared/models/services/place/region.model';
import {Village} from '../../../../../../../shared/models/services/place/village.model';
import {District} from '../../../../../../../shared/models/services/place/district.model';

import {RegionService} from '../../../../../services/place-service/region.service';
import {VillageService} from '../../../../../services/place-service/village.service';
import {DistrictService} from '../../../../../services/place-service/district.service';

@Component({
  selector: 'app-villages-form',
  templateUrl: './villages-form.component.html',
  styleUrls: ['./villages-form.component.css']
})
export class VillagesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/place_asistent.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nové mesto alebo obec pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Kraje', link: '/dashboard/services/places/table/regions'}, {title: 'Okresy', link: '/dashboard/services/places/table/districts'}];

  public regionSelect: number = 1;
  public districtSelect: number = 1;
  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového mesta alebo obce';

  private village: Village;
  public regions: Region[];
  public districts: District[];
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    fullName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    shortName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    zip: new FormControl(null, {
      validators: [Validators.pattern('[0-9 ]+'), Validators.required],
      updateOn: 'change'
    }),
    use: new FormControl(1),
    regionId: new FormControl(null, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    districtId: new FormControl(null, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
  });

  public constructor(private router: Router,
                     private regionService: RegionService,
                     private villageService: VillageService,
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
      this.districtService.getAllDataObservable
        .subscribe((districts: District[]) => {
          this.districts = districts;
        })
    );

    this.districtService.getAll(1, 100);

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.village = this.villageService
          .getGetAllData()
          .filter(e => e.id == params.id)
          .pop();

        if (this.village == null) return;

        this.formGroup.setValue({fullName: this.village.fullName, shortName: this.village.shortName, zip: this.village.zip, use: this.village.use, regionId: this.village.regionId, districtId: this.village.districtId });
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
    if (this.village == null) {
      this.subscriptions.push(
        this.villageService.create(this.formGroup)
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
    } else {
      this.subscriptions.push(
        this.villageService.update({...this.village, ...this.formGroup.value})
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
      this.village = null;
    }
    return;
  }


  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#villageFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/places/table/villages']);
    return;
  }
}
