import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appButtonHover]'
})
export class ButtonDirective implements OnInit {
  @Input() public backgroundInput: string = '#176c9d';
  @Input() public backgroundHoverInput: string = '#1796dc';

  @HostBinding('style.backgroundColor') public backgroundColor: string;

  public constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit() {
    this.backgroundColor = this.backgroundInput;
  }

  @HostListener('mouseenter') public mouseover(eventData: Event) {
    this.backgroundColor = this.backgroundHoverInput;
  }

  @HostListener('mouseleave') public mouseleave(eventData: Event) {
    this.backgroundColor = this.backgroundInput;
  }
}
