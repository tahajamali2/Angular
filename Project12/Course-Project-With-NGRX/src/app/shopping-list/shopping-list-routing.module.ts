import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoggingService } from "../logging.service";
import { ShoppingListComponent } from "./shopping-list.component";


const routes:Routes = [
    {path:'',component:ShoppingListComponent}
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
exports:[RouterModule],
providers:[LoggingService]
})
export class ShoppingListRoutingModule {

}