import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth.interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/services/recipes.service";
import { ShoppingListService } from "./shopping-list/services/shoppinglist.service";

@NgModule({
    providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},ShoppingListService,RecipeService]
})
export class CoreModule {

}