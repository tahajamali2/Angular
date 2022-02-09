import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mergeview',
  templateUrl: './mergeview.component.html',
  styleUrls: ['./mergeview.component.css']
})
export class MergeviewComponent implements OnInit {

  @Input() second:number;
  constructor() {
    console.log(this.second);
   }

  ngOnInit(): void {
  }

}
