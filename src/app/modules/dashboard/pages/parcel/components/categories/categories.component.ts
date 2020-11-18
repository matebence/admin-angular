declare const $: any;

import {Subscription} from 'rxjs/index';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {Row} from 'ng2-smart-table/lib/lib/data-set/row';
import {Component, OnDestroy, OnInit} from '@angular/core';

import categoryTableConfig from '../../../../../../configs/js/parcel/table.category.config.js';

import {Category} from '../../../../../../shared/models/services/parcel/category.model';

import {CategoryService} from '../../../../services/parcel-service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private row: Row;
  public source: LocalDataSource;
  public header: string = 'Kategórie';
  private subscriptions: Subscription[] = [];

  public settings: any = categoryTableConfig;

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private categoryService: CategoryService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.categoryService.errorDataObservable
        .subscribe((error: Error) => {
          $('#categoryModal').modal('show');
          this.title = 'Chyba';
          this.text = error.message;
          this.negativeButton = 'Zatvoriť';
          this.pozitiveButton = '';
          this.row = null;
        })
    );

    this.subscriptions.push(
      this.categoryService.getAllDataObservable
        .subscribe((categories: Category[]) => {
          this.source = new LocalDataSource(categories);
        })
    );

    this.subscriptions.push(
      this.categoryService.getAll(1, 100)
        .subscribe((categories: Category[]) => {
          this.categoryService.setGetAllData(categories);
          this.source = new LocalDataSource(categories);
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onTableCreateData(row: boolean): void {
    if (row) this.router.navigate(['new'], {relativeTo: this.activatedRoute});
    return;
  }

  public onTableDeleteData(row: Row): void {
    $('#categoryModal').modal('show');
    this.text = 'Naozaj chcete odstrániť položku?';
    this.title = 'Odstránenie';
    this.negativeButton = 'Zrušiť';
    this.pozitiveButton = 'Áno, odstrániť';

    this.row = row;
    return;
  }

  public onTableEditData(row: Row): void {
    this.router.navigate(['edit', row.getData().id], {relativeTo: this.activatedRoute});
    this.row = row;
    return;
  }

  public onModalResult(event: boolean): void {
    if (!event || this.row == null) return;
    setTimeout(() => this.categoryService.delete(this.row.getData().id)
      .subscribe(result => {
        if (!result) return;

        let categories: Category[] = this.categoryService.getGetAllData().filter(e => e.id != this.row.getData().id);
        this.categoryService.setGetAllData(categories);

        this.source.remove(this.row.getData());
        this.row = null;
      }), 1000);
    return;
  }
}
