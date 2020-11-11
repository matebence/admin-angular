import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input('tileText') public text: string;
  @Input('tileTitle') public title: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }
}
