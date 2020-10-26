import {Component, Input, OnInit} from '@angular/core';

import {Details} from '../../../../shared/models/components/navigation.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {

  @Input('navGroup') public group: string;
  @Input('navDetails') public details: Details;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onShowNavigationOption(details: Details): boolean {
    if (details.hasOwnProperty('authorities')) {
      return details.authorities.some(r => ['ROLE_MANAGER'].includes(r));
    } else {
      return false;
    }
  }
}
