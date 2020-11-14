import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.css']
})
export class ExplanationComponent implements OnInit {

  @Input('explanationText') public text: string;
  @Input('explanationTitle') public title: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
