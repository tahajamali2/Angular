import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipes.service';
import * as RecipesActions from '../../store/recipes.actions';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input("recipeItem") recipeItem:Recipe;
  constructor(private recipeservice:RecipeService,private store:Store) {

   }

  ngOnInit(): void {
  }

  onItemclick() 
  {
    //this.recipeservice.recipeSelected.next(this.recipeItem);
    //this.store.dispatch(new RecipesActions.SelectRecipe(this.recipeItem));
  }

}
