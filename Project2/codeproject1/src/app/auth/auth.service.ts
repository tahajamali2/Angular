import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http:HttpClient,private router:Router) {}

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTime:any;
  signup(email:string,password:string) {
     return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firbaseAPIKey,
      {email:email,password:password,returnSecureToken:true}).pipe(catchError(this.HandleError),tap(response=> 
        {   
            this.handleAuthentication(response);
        }));
  }

  login(email:string,password:string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firbaseAPIKey,
    {email:email,password:password,returnSecureToken:true}).pipe(catchError(error=> {
        return this.HandleError(error);
    }),tap(resp=> {
        this.handleAuthentication(resp);
    }));
  }

  logOut() {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      if(this.tokenExpirationTime) {
        clearTimeout(this.tokenExpirationTime);
      }
      this.tokenExpirationTime = null;
  }

  autoLogin() {
    const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} =
     JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
        return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate)) ;
    if(loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration:number) {
   this.tokenExpirationTime = setTimeout(()=> {
        this.logOut();
    },expirationDuration);
  }

  private handleAuthentication(response:AuthResponseData) {
    const expressionDate = new Date(new Date().getTime()+ +(response.expiresIn)*1000)
            const returnUser = new User(response.email,response.localId,response.idToken,expressionDate);
            this.user.next(returnUser);
            this.autoLogout(+(response.expiresIn)*1000)
            localStorage.setItem('userData',JSON.stringify(returnUser))
  }
  private HandleError(errorResp:HttpErrorResponse) {
    let errorMessage:string = 'An unknown error occurred!';
    if(!errorResp.error || !errorResp.error.error) {
        return throwError(()=> new Error(errorMessage));
    }
  switch(errorResp.error.error.message) {
        case 'EMAIL_EXISTS': errorMessage = 'This email exists already';break;
        case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exists!';break;
        case 'INVALID_PASSWORD': errorMessage = 'Your entered password is invalid!';break;
        case 'USER_DISABLED': errorMessage = 'Your account has been disabled!';break;
    }
    return throwError(()=> new Error(errorMessage));
  }
}
