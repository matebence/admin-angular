import {Component, Input, OnInit} from '@angular/core';

import navigationConfig from '../../../../configs/navigation.config.json'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input('navToogle') public toggle: boolean;

  public navigationItems: any = navigationConfig;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
