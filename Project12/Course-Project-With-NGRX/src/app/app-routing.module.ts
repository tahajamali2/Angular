import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { BlankComponentComponent } from './blank-component/blank-component.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RecipesRoutingModule } from "./recipes/recipes-routing.module";


const appRoutes : Routes = [
    {path:'',component:BlankComponentComponent,pathMatch:"full",data:{message:''}},
    {path:'recipes',loadChildren:()=> import('./recipes/recipes.module').then(mod=> mod.RecipesModule)},
    {path:'shoppinglist',loadChildren:()=> import('./shopping-list/shopping-list.module').then(mod=> mod.ShoppingListModule)},
    {path:'auth',loadChildren:()=> import('./auth/auth.module').then(mod=> mod.AuthModule)},
    //{path:'not-found',component:PageNotFoundComponent}
    {path:'not-found',component:ErrorpageComponent,data:{message:'Page not found!'}},
    {path:'**',redirectTo:'/not-found'}
  ];

@NgModule({
    imports:[
        // RouterModule.forRoot(appRoutes,{useHash:true})--for hash-mode
        // RouterModule.forRoot(appRoutes,{useHash:true})--for hash-mode
RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })
    ]
    ,
    exports : [RouterModule]
    })
export class AppRoutingModule {

}