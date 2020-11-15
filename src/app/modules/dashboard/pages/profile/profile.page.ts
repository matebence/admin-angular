declare const $: any;

import {Observable, Subject} from 'rxjs/index';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../core/guards/leave.guard';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  private synced: boolean = false;
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    userName: new FormControl(null, {
      validators: [Validators.pattern('^[A-Za-z_.]+$'), Validators.required],
      updateOn: 'change'
    }),
    email: new FormControl(null, {
      validators: [Validators.email, Validators.required],
      updateOn: 'change'
    }),
    firstName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    lastName: new FormControl(null, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    gender: new FormControl(-1, {
      validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
      updateOn: 'change'
    }),
    tel: new FormControl(null, {
      validators: [Validators.required],
      updateOn: 'change'
    }),
    places: new FormGroup({
      code: new FormControl('sk', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      country: new FormControl(null, {
        validators: [Validators.pattern('^[A-Za-z]+$'), Validators.required],
        updateOn: 'change'
      }),
      region: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      district: new FormControl(null, {
        validators: [Validators.pattern('^[\\D ]+$'), Validators.required],
        updateOn: 'change'
      }),
      place: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      street: new FormControl(null, {
        validators: [Validators.pattern('^[\\D 0-9]+$'), Validators.required],
        updateOn: 'change'
      }),
      zip: new FormControl(null, {
        validators: [Validators.pattern('^[0-9 ]+$'), Validators.required],
        updateOn: 'change'
      })
    })
  });

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onFormResult(event: boolean): void {
    $('#profileModal').modal('show');
    this.text = 'Používateľské konto sme úspešne aktualizovali';
    this.title = 'Informácia';
    this.negativeButton = 'Zatvoriť';
    this.pozitiveButton = '';
    this.synced = event;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty || this.synced) return true;
    if (event) this.modalResult.next(event);

    $('#profileModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';
    this.synced = false;

    return this.modalResult.asObservable();
  }
}
