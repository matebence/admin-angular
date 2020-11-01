import {Component, Input, OnInit} from '@angular/core';

import navigationConfig from '../../../../configs/json/navigation.config.json'

import {Navigation} from '../../../../shared/models/components/navigation.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input('navToogle') public toggle: boolean;

  public navigationItems: Navigation[] = navigationConfig;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
