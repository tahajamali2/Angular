import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService:AuthService ) {
        
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authService.user.pipe(take(1),exhaustMap(user=> {
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