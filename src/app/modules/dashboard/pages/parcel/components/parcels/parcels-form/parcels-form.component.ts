declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {User} from '../../../../../../../shared/models/services/user/user.model';
import {Parcel} from '../../../../../../../shared/models/services/parcel/parcel.model';
import {Category} from '../../../../../../../shared/models/services/parcel/category.model';

import {UserService} from '../../../../../services/user-service/user.service';
import {ParcelService} from '../../../../../services/parcel-service/parcel.service';
import {CategoryService} from '../../../../../services/parcel-service/category.service';

@Component({
  selector: 'app-parcels-form',
  templateUrl: './parcels-form.component.html',
  styleUrls: ['./parcels-form.component.css']
})
export class ParcelsFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/parcel_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový balík v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Recenzie', link: '/dashboard/services/parcels/ratings'}, {title: 'Kategórie', link: '/dashboard/services/parcels/categories'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie nového balíka';

  public users: User[];
  public categories: Category[];
  private parcel: Parcel;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    sender: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    receiver: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    categoryId: new FormControl(-1, {
      validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
      updateOn: 'change'
    }),
    length: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
    width: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
    height: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
    weight: new FormControl(null, {
      validators: [Validators.pattern('^[0-9.]+$'), Validators.required],
      updateOn: 'change'
    }),
    note: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    canceled: new FormControl(-1, {
      validators: [Validators.pattern('^true$|^false$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private userService: UserService,
                     private parcelService: ParcelService,
                     private activatedRoute: ActivatedRoute,
                     private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getAll(0, 100)
        .subscribe((users: User[]) => {
          this.users = users;
        })
    );

    this.subscriptions.push(
      this.categoryService.getAll(1, 100)
        .subscribe((categories: Category[]) => {
          this.categories = categories;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.parcelService.get(params.id);
        }))
        .subscribe((result: Parcel) => {
          this.parcel = result;

          this.formGroup.setValue({sender: this.parcel.sender.senderId, receiver: this.parcel.receiver.receiverId, categoryId: this.parcel.categoryId, length: this.parcel.length, width: this.parcel.width, height: this.parcel.height, weight: this.parcel.weight, note: this.parcel.note, canceled: this.parcel.canceled});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie balíka';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať balík v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.parcel == null ? this.onCreate() : this.onUpdate();
    this.parcel = null;
    return;
  }

  private onCreate(): void {
    this.subscriptions.push(
      this.parcelService.create(this.formGroup)
        .pipe(switchMap((result: Parcel) => {
          return this.parcelService.getAll(1, 100);
        }))
        .subscribe((result: Parcel[]) => {
          this.parcelService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    const parcel: Parcel = {id: this.parcel.id, ...this.formGroup.value};
    this.subscriptions.push(
      this.parcelService.update(parcel)
        .pipe(switchMap((result: boolean) => {
          if (!result) return;

          return this.parcelService.getAll(1, 100);
        }))
        .subscribe((result: Parcel[]) => {
          this.parcelService.setGetAllData(result);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#parcelFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/parcels/main']);
    return;
  }
}
