import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shoppinglist.service";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeService {

    constructor(private slservice:ShoppingListService) {

    }

    private recipes:Recipe[] = [
        new Recipe(1,'Chicken Krunch','Grilled chicken with mustard sauce','http://irepo.primecp.com/1007/65/190488/Chicken-Crunch--1--_Medium_ID-707582.jpg?v=707582'
        ,[new Ingredient('Meat',1),new Ingredient('French-Fries',20)]),
        new Recipe(2,'Tarragon Chicken Steak','Grilled tarragon steak','https://157212-453144-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/03/tarragon-chicken-4.jpg',
        [new Ingredient('Meat',1),new Ingredient('Buns',2)])
       ];     

       //recipeSelected = new Subject<Recipe>();
       public refreshEvent = new Subject<void>();

       geRecipes():Recipe[]  {
           return this.recipes.slice();
       }

       geRecipe(id:number):Recipe  {
        return this.recipes.filter((obj)=>{return obj.id===id})[0];
    }

       addIngredientsToShoppingList(ingredient:Ingredient[]) {
        this.slservice.addIngredients(ingredient);
       }

       addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.refreshEvent.next();
       }

       updateRecipe(recipe:Recipe,id:number) {
           this.recipes[this.recipes.findIndex((obj)=>{return obj.id===id})]=recipe;
           this.refreshEvent.next();
        }

        deleteRecipe(id:number) {
            this.recipes.splice(this.recipes.findIndex((obj)=>{return obj.id===id}),1);
            this.refreshEvent.next();
        }

        getNewID():number {
            return this.recipes[this.recipes.length-1].id+1;
        }
}