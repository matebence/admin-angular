import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('navEvent') public onToogle = new EventEmitter<boolean>();

  @Input('navToogle') public toggle: boolean;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onNavToggle(): void {
    this.toggle = !this.toggle;
    this.onToogle.emit(this.toggle);
    return;
  }
}
