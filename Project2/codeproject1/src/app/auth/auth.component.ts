import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService,AuthResponseData } from "./auth.service";
import { AlertComponent } from "../shared/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnInit,OnDestroy {
    isLoginMode:boolean = true;
    loginOrSignupForm:FormGroup;
    isLoading=false;
    error:string=null;
    authobs:Observable<AuthResponseData>;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective
    alertsubscription:Subscription;

    

    constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) {

    }

    ngOnInit(): void {
        this.loginOrSignupForm = new FormGroup({
            'email':new FormControl(null,[Validators.email,Validators.required]),
            'password':new FormControl(null,[Validators.required,Validators.minLength(6)])
        });
    }

     

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        const email = this.loginOrSignupForm.value.email;
        const password = this.loginOrSignupForm.value.password;
        this.isLoading = true;
        if(this.isLoginMode) {
            this.authobs= this.authService.login(email,password)
        }
        else {
            this.authobs = this.authService.signup(email,password);
        }

        this.authobs.subscribe({next:(response)=> {
            this.isLoading = false;
            console.log(response);
            this.router.navigate(['/recipes']);
        },error:(errorMessage)=> {
            this.isLoading = false;
            this.error = errorMessage;
            this.showErrorAlert(errorMessage)
        }});

        this.loginOrSignupForm.reset();
    }

    onCloseHandler() {
        this.error = null;
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
    }
}