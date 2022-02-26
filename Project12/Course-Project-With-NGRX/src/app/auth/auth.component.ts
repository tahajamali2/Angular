import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit,OnDestroy {
    isLoginMode:boolean = true;
    loginOrSignupForm:FormGroup;
    isLoading=false;
    error:string=null;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective
    alertsubscription:Subscription;
    storeSub:Subscription;

    

    constructor(private store:Store<fromApp.AppState>,
        private componentFactoryResolver:ComponentFactoryResolver) {

    }

    ngOnInit(): void {
        this.loginOrSignupForm = new FormGroup({
            'email':new FormControl(null,[Validators.email,Validators.required]),
            'password':new FormControl(null,[Validators.required,Validators.minLength(6)])
        });

        this.storeSub = this.store.select('auth').
        subscribe(authState=> {
            this.isLoading = authState.loading;
            this.error = authState.authErrorMessage;
            if(authState.authErrorMessage) {
                this.showErrorAlert(authState.authErrorMessage);
            }
        })
    }

     

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        const email = this.loginOrSignupForm.value.email;
        const password = this.loginOrSignupForm.value.password;
        this.isLoading = true;
        if(this.isLoginMode) {
            //this.authobs= this.authService.login(email,password)
            this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}));
        }
        else {
            //this.authobs = this.authService.signup(email,password);
            this.store.dispatch(new AuthActions.SignUpStart({email:email,password:password}));
        }

        
        // this.authobs.subscribe({next:(response)=> {
        //     this.isLoading = false;
        //     console.log(response);
        //     this.router.navigate(['/recipes']);
        // },error:(errorMessage)=> {
        //     this.isLoading = false;
        //     this.error = errorMessage;
        //     this.showErrorAlert(errorMessage)
        // }});

        this.loginOrSignupForm.reset();
    }

    onCloseHandler() {
        //this.error = null;
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(errorMessage:string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = errorMessage;
        this.alertsubscription= componentRef.instance.close.subscribe(() => {
            this.alertsubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if(this.alertsubscription) {
            this.alertsubscription.unsubscribe();
        }

        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}