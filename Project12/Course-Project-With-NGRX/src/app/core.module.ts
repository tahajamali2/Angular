import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth.interceptor.service";
import { LoggingService } from "./logging.service";
import { RecipeService } from "./recipes/services/recipes.service";

@NgModule({
    providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true},RecipeService]
})
export class CoreModule {

}