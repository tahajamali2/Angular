import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input("recipeItem") recipeItem:Recipe;
  constructor(private recipeservice:RecipeService) {

   }

  ngOnInit(): void {
  }

  onItemclick() 
  {
    //this.recipeservice.recipeSelected.next(this.recipeItem);
  }

}
