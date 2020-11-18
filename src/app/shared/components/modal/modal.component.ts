import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output('modalResult') public onButtonClick = new EventEmitter<boolean>();

  @Input('modalId') public id: string;
  @Input('modalText') public text: string;
  @Input('modalTitle') public title: string;
  @Input('modalNegativeButton') public negativeButton: string;
  @Input('modalPozitiveButton') public pozitiveButton: string;

  public constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public onNegativeButtonClick(): void {
    this.onButtonClick.emit(false);
    return;
  }

  public onPozitiveButtonClick(): void {
    this.onButtonClick.emit(true);
    return;
  }
}
