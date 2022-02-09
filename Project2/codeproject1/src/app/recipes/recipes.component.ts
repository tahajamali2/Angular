import { Component, Inject, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(@Inject(RecipeService) private recipeservice:RecipeService) {
    
   }

  ngOnInit(): void {
    // this.recipeservice.recipeSelected.subscribe((selRecipe:Recipe)=>
    //  {this.selectedRecipe = selRecipe}
    //  )
  }

}
