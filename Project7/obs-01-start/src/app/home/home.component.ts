import { Component, OnDestroy, OnInit } from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private firstObsSubscription:Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription=interval(1000).subscribe({next:(count)=> {
    //   console.log(count);
    // }})

    const customIntervalObservable = new Observable(observer=> {
      let counter:number = 0;
      setInterval(()=> {
        observer.next(counter);
        if(counter==5) {
          observer.complete();
        }
        if(counter>3) {
          observer.error(new Error('Count is greater'));
        }
        counter++;
      },1000);
    });

    

    this.firstObsSubscription = customIntervalObservable.pipe(filter((data2:number)=> {
      return ((data2) > 0);
        }),map((data:number)=> {
      return 'Round: '+(data+1);
    })).subscribe((data)=> {
      console.log(data);
    },error=> {
      alert(error);
    },()=> {
      console.log('completed');
    })
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }

}
