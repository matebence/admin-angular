import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appLinkHover]'
})
export class LinkDirective implements OnInit {

  @Input() colorInput: string = '#176c9d';
  @Input() colorHoverInput: string = '#1796dc';

  @Input() backgroundInput: string = 'transparent';
  @Input() backgroundHoverInput: string = 'transparent';

  @HostBinding('style.color') color: string;
  @HostBinding('style.textDecoration') textDecoration: string;
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.color = this.colorInput;
    this.textDecoration = 'none';
    this.backgroundColor = this.backgroundInput;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.textDecoration = 'none';
    this.color = this.colorHoverInput;
    this.backgroundColor = this.backgroundHoverInput;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.color = this.colorInput;
    this.backgroundColor = this.backgroundInput;
  }
}
