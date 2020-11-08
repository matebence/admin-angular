declare const $: any;

import {Observable, Subject, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
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

  public illustration: string = 'assets/img/place_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť nový kraj pre aplikáciu Blesk.';
  public assistentOptions: any = [{title: 'Okresy', link: '/dashboard/services/places/table/districts'}, {title: 'Mestá a obce', link: '/dashboard/services/places/table/villages'}];

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
      validators: [Validators.maxLength(2), Validators.pattern('[A-Z]+'), Validators.required],
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
      this.activatedRoute.params.subscribe((params: Params) => {
        this.region = this.regionService
          .getGetAllData()
          .filter(e => e.id == params.id)
          .pop();

        if (this.region == null) return;
        this.formGroup.setValue({name: this.region.name, shortcut: this.region.shortcut, use: this.region.use});

        this.formButton = 'Aktualizovať';
        this.formTitle = 'Aktualizovanie kraja';
        this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať kraj pre aplikáciu Blesk.';
      })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    if (this.region == null) {
      this.subscriptions.push(
        this.regionService.create(this.formGroup)
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
    } else {
      this.subscriptions.push(
        this.regionService.update({...this.region, ...this.formGroup.value})
          .subscribe((result: boolean) => {
            if (!result) return;
            this.onSuccess();
          })
      );
      this.region = null;
    }
    return;
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
    this.router.navigate(['/dashboard/services/places/table/regions']);
    return;
  }
}
