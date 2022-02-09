import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

//@Injectable({providedIn:"root"})
export class ShoppingListService {

    public refreshEvent = new Subject<void>();
    public startedEditing = new Subject<number>();
    private ingredients:Ingredient[] = [
        new Ingredient('Apple',5),
        new Ingredient('Tomatoes',10)
      ];

      public addIngredient(name:string,price:number) {
        this.ingredients.push(new Ingredient(name,price));
        this.refreshEvent.next();
      }

      public getIngredients():Ingredient[] {
        return this.ingredients.slice();
      }

      public getIngredient(index:number):Ingredient {
        return this.ingredients[index];
      }

      public deleteIngredeint(index:number):void {
        this.ingredients.splice(index,1);
        this.refreshEvent.next();
      }

      public updateIngredient(index:number,updatedIngredient : Ingredient):void {
        this.ingredients[index] = updatedIngredient;
        this.refreshEvent.next();
      }

      public addIngredients(ingredients:Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.refreshEvent.next();
      }

}