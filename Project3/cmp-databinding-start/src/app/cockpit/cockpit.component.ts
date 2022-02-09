import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() servercreated = new EventEmitter<{serverName:string , serverContent:string}>();
  @Output('bpcreated') blueprintCreated = new EventEmitter<{serverName:string , serverContent:string}>();;
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput',{static:true}) serverContentInput : ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput:HTMLInputElement) {
     this.servercreated.emit({serverName:nameInput.value,serverContent:this.serverContentInput.nativeElement.value});
  }

  onAddBlueprint(nameInput:HTMLInputElement) {
     this.blueprintCreated.emit({serverName:nameInput.value,serverContent:this.serverContentInput.nativeElement.value});
  }

}
