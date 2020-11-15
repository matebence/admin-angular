declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {CategoryService} from '../../../../../services/parcel-service/category.service';

import {Category} from '../../../../../../../shared/models/services/parcel/category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/parcel_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú kategóriu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Balíky', link: '/dashboard/services/parcels/main'}, {title: 'Recenzie', link: '/dashboard/services/parcels/ratings'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej kategórie';

  private category: Category;
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    })
  });

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.categoryService.get(params.id);
        }))
        .subscribe((result: Category) => {
          this.category = result;

          this.formGroup.setValue({name: this.category.name});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie kategórie';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať kategóriu v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.category == null ? this.onCreate() : this.onUpdate();
    this.category = null;
    return;
  }

  private onCreate(): void {
    let category: Category;
    this.subscriptions.push(
      this.categoryService.create(this.formGroup)
        .subscribe((result: Category) => {
          category = result;
          let categories: Category[] = this.categoryService.getGetAllData();
          categories.unshift(category);
          this.categoryService.setGetAllData(categories);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let category: Category = {id: this.category.id, ...this.formGroup.value};
    this.subscriptions.push(
      this.categoryService.update(category)
        .subscribe((result: boolean) => {
          if (!result) return;

          let categories: Category[] = this.categoryService.getGetAllData().filter(e => e.id != category.id);
          categories.unshift(category);
          this.categoryService.setGetAllData(categories);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#categoryFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/parcels/categories']);
    return;
  }
}
