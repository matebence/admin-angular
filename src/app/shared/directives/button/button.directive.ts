import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appButtonHover]'
})
export class ButtonDirective implements OnInit {
  @Input() backgroundInput: string = '#176c9d';
  @Input() backgroundHoverInput: string = '#1796dc';

  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.backgroundColor = this.backgroundInput;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = this.backgroundHoverInput;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.backgroundInput;
  }
}
