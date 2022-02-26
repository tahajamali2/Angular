import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoggingService } from './logging.service';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'codeproject1';
  constructor(private store: Store,private logginService:LoggingService) {

  }
  ngOnInit(): void {
    //this.authService.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());

    this.logginService.printLog('Hello from AppComponent ngOnInit');
  }
}
