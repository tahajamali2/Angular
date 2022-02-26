import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe:Recipe;
 id:number;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.geRecipe(+this.route.snapshot.params["id"]);
    this.id = +this.route.snapshot.params["id"];
    this.route.params.subscribe((params:Params)=> {
      this.recipe = this.recipeService.geRecipe(+params["id"]);
      this.id = +params["id"];
    })
  }

  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
