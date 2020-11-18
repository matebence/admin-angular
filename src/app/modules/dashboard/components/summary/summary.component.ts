import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  @Input('summaryData') public data: string;
  @Input('summaryTitle') public title: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
