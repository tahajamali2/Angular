import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const appRoutes : Routes = [
    {path:'',component:AuthComponent}
  ];

@NgModule({
    declarations:[AuthComponent],
    imports: [SharedModule,RouterModule.forChild(appRoutes),ReactiveFormsModule]
})
export class AuthModule {
    
}