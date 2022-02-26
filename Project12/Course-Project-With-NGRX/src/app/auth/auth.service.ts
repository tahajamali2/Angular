import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';



@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store:Store<fromApp.AppState>) {}

  
  private tokenExpirationTime:any;
 

  setLogoutTimer(expirationDuration:number) {
   this.tokenExpirationTime = setTimeout(()=> {
        this.store.dispatch(new AuthActions.Logout());
    },expirationDuration);
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
      this.tokenExpirationTime = null;
    }
   }

 
}
