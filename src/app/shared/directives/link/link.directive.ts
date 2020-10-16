import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appLinkHover]'
})
export class LinkDirective implements OnInit {

  @Input() public colorInput: string = '#176c9d';
  @Input() public colorHoverInput: string = '#1796dc';

  @Input() public backgroundInput: string = 'transparent';
  @Input() public backgroundHoverInput: string = 'transparent';

  @HostBinding('style.color') public color: string;
  @HostBinding('style.textDecoration') public textDecoration: string;
  @HostBinding('style.backgroundColor') public backgroundColor: string;

  public constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit() {
    this.color = this.colorInput;
    this.textDecoration = 'none';
    this.backgroundColor = this.backgroundInput;
  }

  @HostListener('mouseenter') public mouseover(eventData: Event) {
    this.textDecoration = 'none';
    this.color = this.colorHoverInput;
    this.backgroundColor = this.backgroundHoverInput;
  }

  @HostListener('mouseleave') public mouseleave(eventData: Event) {
    this.color = this.colorInput;
    this.backgroundColor = this.backgroundInput;
  }
}
