import {Component, OnInit} from '@angular/core';

import {RouteFilter} from '../core/filter/route.filter';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './app.bootstrap.html',
  styleUrls: ['./app.bootstrap.css']
})
export class AppBootstrap implements OnInit {

  public constructor(private routeFilter: RouteFilter) {
  }

  public ngOnInit(): void {
    return;
  }
}
