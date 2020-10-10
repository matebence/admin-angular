import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit} from '@angular/core';

@Directive({
  selector: '[appLinkHover]'
})
export class LinkDirective implements OnInit {
  @HostBinding('style.color') color: string;
  @HostBinding('style.textDecoration') text: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.color = '#176c9d';
    this.text = 'none';
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.color = '#1796dc';
    this.text = 'none';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.color = '#176c9d';
  }
}
