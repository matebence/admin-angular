import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../../../../core/services/account-service/account-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public form: FormGroup;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormGroup({
        name: new FormControl(null, {validators: [Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.required], updateOn: 'change'}),
        password: new FormControl(null, {validators: [Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?:.{8}|.{30})'), Validators.required], updateOn: 'change'})
      }),
      remain: new FormControl(false),
    });
  }

  onSubmit() {
    this.accountService.signIn(this.form);
  }
}
