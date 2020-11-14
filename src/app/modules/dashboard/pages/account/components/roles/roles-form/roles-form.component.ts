declare const $: any;

import {switchMap} from 'rxjs/internal/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {CanComponentDeactivate} from '../../../../../../../core/guards/leave.guard';

import {RoleService} from '../../../../../services/account-service/role.service';
import {PrivilegeService} from '../../../../../services/account-service/prvilege.service';

import {Role} from '../../../../../../../shared/models/services/account/role.model';
import {Privilege} from '../../../../../../../shared/models/services/account/privilege.model';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public text: string;
  public title: string;
  public negativeButton: string;
  public pozitiveButton: string;

  public illustration: string = 'assets/img/account_assistant.svg';
  public assistent: string = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte vytvoriť novú rolu v aplikácií Blesk.';
  public assistentOptions: any = [{title: 'Kontá', link: '/dashboard/services/accounts/main'}, {title: 'Preferencie', link: '/dashboard/services/accounts/preferences'}, {title: 'Privilégia', link: '/dashboard/services/accounts/privileges'}];

  public formButton: string = 'Vytvoriť';
  public formTitle: string = 'Vytvorenie novej roli';

  private role: Role;
  public privileges: Privilege[];
  private subscriptions: Subscription[] = [];
  private modalResult = new Subject<boolean>();

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: [Validators.pattern('^[A-Z_]+$'), Validators.required],
      updateOn: 'change'
    }),
    rolePrivileges: new FormArray([new FormGroup({
      privileges: new FormGroup({
        privilegeId: new FormControl(-1, {
          validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
          updateOn: 'change'
        })
      })
    })])
  });

  public constructor(private router: Router,
                     private roleService: RoleService,
                     private activatedRoute: ActivatedRoute,
                     private privilegeService: PrivilegeService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.privilegeService.getAll(0, 100)
        .subscribe((privileges: Privilege[]) => {
          this.privileges = privileges;
        })
    );

    this.subscriptions.push(
      this.activatedRoute.params
        .pipe(switchMap((params: Params) => {
          if (!params.hasOwnProperty('id')) return EMPTY;
          return this.roleService.get(params.id);
        }))
        .subscribe((result: Role) => {
          this.role = result;

          this.formGroup.setValue({name: this.role.name, rolePrivileges: this.role.rolePrivileges});

          this.formButton = 'Aktualizovať';
          this.formTitle = 'Aktualizovanie roli';
          this.assistent = 'Výtajte som Váš osobný asistent. Som tu aby som pomohol a vysvetloval. Momentálne sa chystáte aktualizovať rolu v aplikácií Blesk.';
        })
    );

    return;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
    return;
  }

  public onSubmit(): void {
    this.role == null ? this.onCreate() : this.onUpdate();
    this.role = null;
    return;
  }

  private onCreate(): void {
  }

  private onUpdate(): void {
  }

  public onAddPrivilege(): void {
    let formArray = this.formGroup.controls['rolePrivileges'] as FormArray;
    formArray.push(new FormGroup({
      privileges: new FormGroup({
        privilegeId: new FormControl(-1, {
          validators: [Validators.pattern('^(?!0*(\\.0+)?$)(\\d+|\d*\\.\\d+)$'), Validators.required],
          updateOn: 'change'
        })
      })
    }));
    return;
  }

  public onRemovePrivilege(): void {
    let formArray = this.formGroup.controls['rolePrivileges'] as FormArray;
    formArray.removeAt(formArray.length -1);
    return;
  }

  public canDeactivate(event: boolean): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.formGroup.dirty) return true;
    if (event) this.modalResult.next(event);

    $('#roleFormModal').modal('show');
    this.text = 'Máte neuložené zmeny, napriek tomu pokračovať?';
    this.title = 'Upozornenie';
    this.negativeButton = 'Nie, zrušiť';
    this.pozitiveButton = 'Áno, pokračovať';

    return this.modalResult.asObservable();
  }

  private onSuccess(): void {
    this.formGroup.reset();
    this.router.navigate(['/dashboard/services/accounts/roles']);
    return;
  }
}
