import {Directive, Renderer2, ElementRef, HostListener, HostBinding, OnInit} from '@angular/core';

@Directive({
  selector: '[appButtonHover]'
})
export class ButtonDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.backgroundColor = '#176c9d';
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = '#1796dc';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = '#176c9d';
  }
}
