import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  mouseEnter() {

    console.log("Mouse Enter");

    this.el.nativeElement.style.backgroundColor = "yellow";

  }

  @HostListener('mouseleave')
  mouseLeave() {

    console.log("Mouse Leave");

    this.el.nativeElement.style.backgroundColor = "";

  }

}