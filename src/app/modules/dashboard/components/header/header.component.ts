import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('onSidebarToggled') public onToogled = new EventEmitter<boolean>();
  @Input('sidebarToggled') public toggled: boolean;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onSideBarToggle(): void {
    this.toggled = !this.toggled;
    this.onToogled.emit(this.toggled);
  }
}
