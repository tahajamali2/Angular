import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
recipes:Recipe[];

  currentSelectedItem:number = 0;
  constructor(private recipeservice:RecipeService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.recipes = this.recipeservice.geRecipes();
  }

  goToNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }
}
