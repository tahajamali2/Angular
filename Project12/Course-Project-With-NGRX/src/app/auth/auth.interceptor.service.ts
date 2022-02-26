import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService:AuthService ,private store:Store<fromApp.AppState>) {
        
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.store.select('auth').pipe(take(1),map(authstate=> {return authstate.user}),exhaustMap(user=> {
           if(req.url.includes('identitytoolkit.googleapis.com')) {
            return next.handle(req);
           }
            let attachedAuth:{}={};
            
            attachedAuth = {params:req.params.append('auth',user.token)};
            const modifiedRequest = req.clone(attachedAuth);
            return next.handle(modifiedRequest);
        }))
    }
}