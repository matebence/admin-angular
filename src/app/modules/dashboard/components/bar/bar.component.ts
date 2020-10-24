import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @Input('sidebarToggled') toggled: boolean;

  public constructor() {
  }

  public ngOnInit(): void {
  }
}
