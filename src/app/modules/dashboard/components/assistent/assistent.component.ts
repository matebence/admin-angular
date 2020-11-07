import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assistent',
  templateUrl: './assistent.component.html',
  styleUrls: ['./assistent.component.css']
})
export class AssistentComponent implements OnInit {

  @Input('formAssistent') public assistent: string;
  @Input('formIllustration') public illustration: string;
  @Input('formAssistentOptions') public assistentOptions: any;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
