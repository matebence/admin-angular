import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assistent',
  templateUrl: './assistent.component.html',
  styleUrls: ['./assistent.component.css']
})
export class AssistentComponent implements OnInit {

  @Input('assistantText') public text: string;
  @Input('assistantOptions') public options: any;
  @Input('assistantIllustration') public illustration: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
