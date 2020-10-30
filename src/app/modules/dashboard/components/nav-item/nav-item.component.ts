import {Component, Input, OnInit} from '@angular/core';

import {Details} from '../../../../shared/models/components/navigation.model';

import {SecurityService} from '../../services/security-service/security.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {

  @Input('navGroup') public group: string;
  @Input('navDetails') public details: Details;

  public constructor(private securityService: SecurityService) {
  }

  public ngOnInit(): void {
    return;
  }

  public onShowNavigationOption(details: Details): boolean {
    if (details.hasOwnProperty('authorities')) {
      return this.securityService.isInRole(details.authorities);
    } else {
      return false;
    }
  }
}
