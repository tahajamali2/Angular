import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe:Recipe;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.geRecipe(+this.route.snapshot.params["id"]);
    this.route.params.subscribe((params:Params)=> {
      this.recipe = this.recipeService.geRecipe(+params["id"]);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
