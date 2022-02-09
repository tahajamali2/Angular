import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public numberarrays : number[] = [];

  onEverySecond(callback:{sec:number}) {
    this.numberarrays.push(callback.sec);
  }

}
