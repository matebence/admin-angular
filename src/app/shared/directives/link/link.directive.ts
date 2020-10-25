import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appLinkHover]'
})
export class LinkDirective implements OnInit {

  @Input() public colorInput: string = '#176c9d';
  @Input() public colorHoverInput: string = '#1796dc';

  @Input() public backgroundInput: string = 'transparent';
  @Input() public backgroundHoverInput: string = 'transparent';

  @HostBinding('style.color') public color: string = this.colorInput;
  @HostBinding('style.textDecoration') public textDecoration: string = 'none';
  @HostBinding('style.backgroundColor') public backgroundColor: string = this.backgroundInput;

  public constructor(private elRef: ElementRef,
                     private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    return;
  }

  @HostListener('mouseenter')
  public mouseover(eventData: Event): void {
    this.textDecoration = 'none';
    this.color = this.colorHoverInput;
    this.backgroundColor = this.backgroundHoverInput;
    return;
  }

  @HostListener('mouseleave')
  public mouseleave(eventData: Event): void {
    this.color = this.colorInput;
    this.backgroundColor = this.backgroundInput;
    return;
  }
}
