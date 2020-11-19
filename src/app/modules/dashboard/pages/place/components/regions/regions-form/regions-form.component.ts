declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {RegionService} from '../../../../../services/place-service/region.service';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Region} from '../../../../../../../shared/models/services/place/region.model';

@Component({
  selector: 'app-regions-form',
  templateUrl: './regions-form.component.html',
  styleUrls: ['./regions-form.component.css']
})
export class RegionsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/place_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový kraj v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Okresy', link: '/manage/dashboard/services/places/districts'}, {title: 'Mestá a obce', link: '/manage/dashboard/services/places/villages'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového kraja';

  private region: Region;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    shortcut: new FormControl(null, {
      validators: [Validators.maxLength(2), Validators.pattern('^[A-Z]+$'), Validators.required],
      updateOn: 'change'
    }),
    use: new FormControl(1)
  });

  public constructor(private router: Router,
                     private regionService: RegionService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.regionService.get(params.id);
        }))
        .subscribe((result: Region) => {
          this.region = result;

          this.formGroup.setValue({name: this.region.name, shortcut: this.region.shortcut, use: this.region.use});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie kraja';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať kraj v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.region == null ? this.onCreate() : this.onUpdate();
    this.region = null;
    return;
  }

  private onCreate(): void {
    let region: Region;
    this.subscriptions.push(
      this.regionService.create(this.formGroup)
        .subscribe((result: Region) => {
          region = result;
          let regions: Region[] = this.regionService.getGetAllData();
          regions.unshift(region);
          this.regionService.setGetAllData(regions);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let region: Region = {id: this.region.id, ...this.formGroup.value};
    this.subscriptions.push(
      this.regionService.update(region)
        .subscribe((result: boolean) => {
          if (!result) return;

          let regions: Region[] = this.regionService.getGetAllData().filter(e => e.id != region.id);
          regions.unshift(region);
          this.regionService.setGetAllData(regions);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#regionFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/manage/dashboard/services/places/regions']);
    return;
  }
}
