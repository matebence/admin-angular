import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input('sidebarToggled') toggled: boolean;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onSideBarToggle(): void {
    this.toggled = !this.toggled;
  }
}
