import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  userActivated = false;
  activatedSubscription:Subscription;
  constructor(private userservice:UserService) {}

  ngOnInit() {
    this.activatedSubscription = this.userservice.activatedEmmiter.subscribe((data:boolean)=> {
      this.userActivated = data;
    })
  }
ngOnDestroy(): void {
  this.activatedSubscription.unsubscribe();
}
}
