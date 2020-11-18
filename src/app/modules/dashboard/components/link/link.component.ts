import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input('linkText') public text: string;
  @Input('linkHref') public href: string;
  @Input('linkTitle') public title: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
