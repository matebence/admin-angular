import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.css']
})
export class DashboardPage implements OnInit {

  public toggled: boolean = false;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onToogleChanged(status: boolean): void {
    this.toggled = status;
  }
}
