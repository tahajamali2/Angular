import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment1',
  templateUrl: './assignment1.component.html',
  styleUrls: ['./assignment1.component.css']
})
export class Assignment1Component implements OnInit {

   togglePara:boolean = false;
   logclick:string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  toggleParagraph() {
    this.togglePara = !this.togglePara;
    this.logclick.push(new Date().getTime().toString());
  }

  getBackColor(nn:number) {
    return nn >=4 ? "blue":"none";
  }
}
