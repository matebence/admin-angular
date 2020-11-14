declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {RatingService} from '../../../../../services/parcel-service/rating.service';
import {ParcelService} from '../../../../../services/parcel-service/parcel.service';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {Parcel} from '../../../../../../../shared/models/services/parcel/parcel.model';
import {Rating} from '../../../../../../../shared/models/services/parcel/rating.model';

@Component({
  selector: 'app-ratings-form',
  templateUrl: './ratings-form.component.html',
  styleUrls: ['./ratings-form.component.css']
})
export class RatingsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/parcel_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú recenziu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Balíky', link: '/dashboard/services/parcels/main'}, {title: 'Kategórie', link: '/dashboard/services/parcels/categories'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej recenzie';

  private review: Rating;
  public parcels: Parcel[];
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    description: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    rating: new FormControl([], {
      validators: [Validators.pattern('^[0-5]$'), Validators.required],
      updateOn: 'change'
    }),
    image: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    parcelId: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private parcelService: ParcelService,
                     private ratingService: RatingService,
                     private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
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
          return this.ratingService.get(params.id);
        }))
        .subscribe((result: Rating) => {
          this.review = result;

          this.formGroup.setValue({description: this.review.description, rating: [this.review.rating], image: this.review.image, parcelId: this.review.parcelId});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie recenzie';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať recenziu v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.review == null ? this.onCreate() : this.onUpdate();
    this.review = null;
    return;
  }

  private onCreate(): void {
    this.formGroup.patchValue({rating: Number(this.formGroup.value.rating.pop())});
    let rating: Rating;
    this.subscriptions.push(
      this.ratingService.create(this.formGroup)
        .pipe(switchMap((result: Rating) => {
          rating = result;
          return this.parcelService.get(result.parcelId)
        }))
        .subscribe((result: Parcel) => {
          rating.parcel = result;
          let ratings: Rating[] = this.ratingService.getGetAllData();
          ratings.unshift(rating);
          this.ratingService.setGetAllData(ratings);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let rating: Rating = {id: this.review.id, ...this.formGroup.value};
    this.subscriptions.push(
      this.ratingService.update(rating)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;
          return this.parcelService.get(rating.parcelId)
        }))
        .subscribe((result: Parcel) => {
          let ratings: Rating[] = this.ratingService.getGetAllData().filter(e => e.id != rating.id);
          rating.parcel = result;
          ratings.unshift(rating);
          this.ratingService.setGetAllData(ratings);

          this.onSuccess();
        })
    );
  }

  public onBase64Convert(files: FileList): void {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = () => {this.formGroup.patchValue({image: fileReader.result});};
    fileReader.onerror = (error) => {this.ratingService.setErrorData({timestamp: new Date().toISOString(), message: 'Pri nahrávani obrázka nastala chyba', error: true});};
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#ratingFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/parcels/ratings']);
    return;
  }
}
