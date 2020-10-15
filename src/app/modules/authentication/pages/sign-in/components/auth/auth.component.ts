import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      user: new FormGroup({
        email: new FormControl(null, {validators: [Validators.required, Validators.email], updateOn: "change"}),
        password: new FormControl(null, {validators: Validators.required, updateOn: "change"})
      }),
      remain: new FormControl(false),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
