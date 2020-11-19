declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
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

  public illustration: string = '../../../../../../../../assets/img/place_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nové mesto alebo obec v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Kraje', link: '/manage/dashboard/services/places/regions'}, {title: 'Okresy', link: '/manage/dashboard/services/places/districts'}];

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
      validators: [Validators.pattern('^[0-9 ]+$'), Validators.required],
      updateOn: 'change'
    }),
    use: new FormControl(1),
    regionId: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    districtId: new FormControl(-1, {
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
      this.regionService.getAll(1, 100)
        .subscribe((regions: Region[]) => {
          this.regions = regions;
        })
    );

    this.subscriptions.push(
      this.districtService.getAll(1, 100)
        .subscribe((districts: District[]) => {
          this.districts = districts;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.villageService.get(params.id);
        }))
        .subscribe((result: Village) => {
          this.village = result;

          this.formGroup.setValue({fullName: this.village.fullName, shortName: this.village.shortName, zip: this.village.zip, use: this.village.use, regionId: this.village.regionId, districtId: this.village.districtId });

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie mesta/obce';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať okres v aplikácií Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.village == null ? this.onCreate() : this.onUpdate();
    this.village = null;
    return;
  }

  private onCreate(): void {
    this.subscriptions.push(
      this.villageService.create(this.formGroup)
        .pipe(switchMap((result: Village) => {
          return this.villageService.getAll(1, 100);
        }))
        .subscribe((result: Village[]) => {
          this.villageService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const village: Village = {id: this.village.id, ...this.formGroup.value};
    this.subscriptions.push(
      this.villageService.update(village)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;

          return this.villageService.getAll(1, 100);
        }))
        .subscribe((result: Village[]) => {
          this.villageService.setGetAllData(result);

          this.onSuccess();
        })
    );
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
    this.router.navigate(['/manage/dashboard/services/places/villages']);
    return;
  }
}
