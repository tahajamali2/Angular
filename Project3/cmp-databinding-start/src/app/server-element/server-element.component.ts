import { AfterContentChecked,
AfterContentInit,
AfterViewChecked,
AfterViewInit,
Component,
DoCheck,
Input,
OnChanges,
OnDestroy,
OnInit,
SimpleChanges, 
ViewEncapsulation,
ElementRef,
ViewChild,
ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements 
OnInit,
OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  @Input('srvElement') element:{type:string,name:string,content:string};
  @Input() name:string
  @ViewChild('heading',{static:true}) header : ElementRef;
  @ContentChild('contentParagraph',{static:true}) paragraph : ElementRef;

  constructor() { 
    console.log("constructor called");
  }

  ngOnChanges(change : SimpleChanges) {
    console.log("ngOnChanges called");
    console.log(change);
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
    console.log("Text Content : "+this.header.nativeElement.textContent);
    console.log("Text content of paragraph : "+this.paragraph.nativeElement.textContent)
  }

  ngDoCheck(): void {
    console.log("ngDocheck called");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called");
    console.log("Text content of paragraph : "+this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    console.log("Text Content : "+this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
  }
}
