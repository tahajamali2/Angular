import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { BlankComponentComponent } from './blank-component/blank-component.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";


const appRoutes : Routes = [
    {path:'',component:BlankComponentComponent,pathMatch:"full",data:{message:''}},
    {path:'recipes',component:RecipesComponent,children:[
        {path:'',component:BlankComponentComponent,data:{message:'Please select a recipe !'}},
        {path:"new",component:RecipeEditComponent},
        {path:":id",component:RecipeDetailComponent},
        {path:":id/edit",component:RecipeEditComponent}
    ]},
    {path:'shoppinglist',component:ShoppingListComponent},
    //{path:'not-found',component:PageNotFoundComponent}
    {path:'not-found',component:ErrorpageComponent,data:{message:'Page not found!'}},
    {path:'**',redirectTo:'/not-found'}
  ];

@NgModule({
    imports:[
        // RouterModule.forRoot(appRoutes,{useHash:true})--for hash-mode
        RouterModule.forRoot(appRoutes)
    ]
    ,
    exports : [RouterModule]
    })
export class AppRoutingModule {

}