declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {PrivilegeService} from '../../../../../services/account-service/prvilege.service';

import {Privilege} from '../../../../../../../shared/models/services/account/privilege.model';

@Component({
  selector: 'app-privileges-form',
  templateUrl: './privileges-form.component.html',
  styleUrls: ['./privileges-form.component.css']
})
export class PrivilegesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = '../../../../../../../../assets/img/account_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú privilégiu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Preferencie', link: '/dashboard/services/accounts/preferences'}, {title: 'Role', link: '/dashboard/services/accounts/roles'}, {title: 'Kontá', link: '/dashboard/services/accounts/main'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej privilégie';

  private privilege: Privilege;
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
                     private privilegeService: PrivilegeService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.privilegeService.get(params.id);
        }))
        .subscribe((result: Privilege) => {
          this.privilege = result;

          this.formGroup.setValue({name: this.privilege.name});

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
    this.privilege == null ? this.onCreate() : this.onUpdate();
    this.privilege = null;
    return;
  }

  private onCreate(): void {
    let privilege: Privilege;
    this.subscriptions.push(
      this.privilegeService.create(this.formGroup)
        .subscribe((result: Privilege) => {
          privilege = result;
          let privileges: Privilege[] = this.privilegeService.getGetAllData();
          privileges.unshift(privilege);
          this.privilegeService.setGetAllData(privileges);

          this.onSuccess();
        })
    );
  }

  private onUpdate(): void {
    let privilege: Privilege = {privilegeId: this.privilege.privilegeId, ...this.formGroup.value};
    this.subscriptions.push(
      this.privilegeService.update(privilege)
        .subscribe((result: boolean) => {
          if (!result) return;

          let privileges: Privilege[] = this.privilegeService.getGetAllData().filter(e => e.privilegeId != privilege.privilegeId);
          privileges.unshift(privilege);
          this.privilegeService.setGetAllData(privileges);

          this.onSuccess();
        })
    );
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#privilegeFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/accounts/privileges']);
    return;
  }
}
