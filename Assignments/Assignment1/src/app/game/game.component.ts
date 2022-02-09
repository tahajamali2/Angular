import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private intervalref;
  private incr = 0;
  @Output("secondEvent") secondevent = new EventEmitter<{sec:number}>();

  constructor() { }

  ngOnInit(): void {
  }

  onStop() {
    clearInterval(this.intervalref);
  }

  onStart() {
     this.intervalref = setInterval(()=> {
      this.incr = this.incr + 1;
     this.secondevent.emit({sec:this.incr});
     },1000)
  }
}
