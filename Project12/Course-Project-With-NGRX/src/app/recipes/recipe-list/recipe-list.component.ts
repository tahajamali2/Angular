import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
recipes:Observable<Recipe[]>;
refresher:Subscription;

  currentSelectedItem:number = 0;
  constructor(private recipeservice:RecipeService,private store:Store<fromApp.AppState>,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  //this.recipes = this.recipeservice.geRecipes();
  this.recipes = this.store.select('recipes').pipe(map((recipeState)=>recipeState.recipes));
  // this.refresher = this.recipeservice.refreshEvent.subscribe(()=> {
  //   this.recipes = this.recipeservice.geRecipes();
  // })
  }

  goToNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    //this.refresher.unsubscribe();
  }
}
