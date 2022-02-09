import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-blank-component',
  templateUrl: './blank-component.component.html',
  styleUrls: ['./blank-component.component.css']
})
export class BlankComponentComponent implements OnInit {

  message:string;

  constructor(private route:ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.message = this.route.snapshot.data["message"];
    this.route.data.subscribe((data:Data)=> {
      this.message = data["message"];
    })
  }

}
