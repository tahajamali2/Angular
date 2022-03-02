import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipes.actions';
import { map, switchMap } from 'rxjs/operators';


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
    //this.recipe = this.recipeService.geRecipe(+this.route.snapshot.params["id"]);
    this.id = +this.route.snapshot.params["id"];
    this.route.params.pipe(map((params)=> {
      return +params['id']}),
    switchMap(id=> {
      this.id = id;
      return this.store.select('recipes');
    }),
    map((recipeState)=>{
      return recipeState.recipes.filter((obj) => {
        return obj.id === this.id;
      })[0];
    })
    ).subscribe((selectedRecipe)=> {
      //this.recipe = this.recipeService.geRecipe(+params["id"]);
      this.recipe = selectedRecipe;
      //this.store.dispatch(new RecipeActions.SelectRecipe(this.recipe));

    })
  }

  onAddToShoppingList() {
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  startEdit() {
    this.store.dispatch(new RecipeActions.StartRecipeEdit());
  }
}
