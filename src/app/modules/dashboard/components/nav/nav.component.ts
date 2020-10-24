import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output('onSidebarToggled') public onToogled = new EventEmitter<boolean>();
  @Input('sidebarToggled') toggled: boolean;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onSideBarToggle(): void {
    this.toggled = !this.toggled;
    this.onToogled.emit(this.toggled);
  }
}
