import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  @Input('illustrationLinks') public links: any;
  @Input('illustrationText') public text: string;
  @Input('illustrationTitle') public title: string;
  @Input('illustrationImage') public image: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
