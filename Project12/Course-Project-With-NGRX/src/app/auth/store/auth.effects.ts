import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {Actions,createEffect,Effect,ofType} from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth.service'
import { User } from '../user.model'
import * as AuthActions from './auth.actions'


export interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean;
}

@Injectable()
export class AuthEffects {

    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),tap((authSuccessAction:AuthActions.AuthenticateSuccess)=> {
        if(authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
        }
    }))


    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT),tap(()=> {
        localStorage.removeItem('userData');
        this.authService.clearLogoutTimer();
        this.router.navigate(['/auth']);
    }))

    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),map(()=> {
        const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} =
     JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
        return {type:'DUMMY'};
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate)) ;
    if(loadedUser.token) {
        //this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({email:loadedUser.email,userId:loadedUser.id,token:loadedUser.token,expirationDate:new Date(userData._tokenExpirationDate),redirect:false})
        
    }

    return {type:'DUMMY'};
    }))

    @Effect()
    authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START),
    switchMap((authData:AuthActions.LoginStart)=> {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firbaseAPIKey,
        {email:authData.payload.email,password:authData.payload.password,returnSecureToken:true}).
        pipe(map(resData=> {
           return this.handleAuthentication(resData);
        }),
        catchError(errorResp=> {
           return this.handleError(errorResp);
        }))
    })

    )

    

    @Effect()
    authSignUp = this.actions$.pipe(ofType(AuthActions.SIGNUP_START),
    switchMap((authData:AuthActions.SignUpStart)=> {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firbaseAPIKey,
        {email:authData.payload.email,password:authData.payload.password,returnSecureToken:true}).
        pipe(map(resData=> {
            return this.handleAuthentication(resData);
        }),
        catchError(errorResp=> {
            return this.handleError(errorResp);
        }))
    })

    )

     handleAuthentication = (resData) => {
        const expressionDate = new Date(new Date().getTime()+ +(resData.expiresIn)*1000)
        localStorage.setItem('userData',JSON.stringify(new User(resData.email,resData.localId,resData.idToken,expressionDate)))
        this.authService.setLogoutTimer(+(resData.expiresIn)*1000);
        return new AuthActions.AuthenticateSuccess({email:resData.email,userId:resData.localId,token:resData.idToken,expirationDate:expressionDate,redirect:true});
    }

     handleError = (errorResp) => {
        let errorMessage:string;
        if(!errorResp.error || !errorResp.error.error) {
            errorMessage = 'An unknown error occurred!';
        }
      switch(errorResp.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'This email exists already';break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exists!';break;
            case 'INVALID_PASSWORD': errorMessage = 'Your entered password is invalid!';break;
            case 'USER_DISABLED': errorMessage = 'Your account has been disabled!';break;
        }
    
    
                return of(new AuthActions.AuthenticationFail({errorMessage:errorMessage}));
    }

    constructor(private actions$:Actions,private http:HttpClient,private router:Router,private authService:AuthService) {

    }
}