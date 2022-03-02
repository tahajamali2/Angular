import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './services/recipes.service';
import * as RecipesActions from './store/recipes.actions';
import * as fromApp from '../store/app.reducer';
import { Actions,ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$:Actions
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    //const recipes = this.recipeService.geRecipes();
    return this.store.select('recipes').pipe(take(1),switchMap((recipeState)=> {
      if(recipeState.recipes.length === 0) {
        this.store.dispatch(new RecipesActions.FetchRecipe());
        return this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES_BATCH),take(1));
      }
      else {
        return of(recipeState.recipes);
      }
    }));

    // this.store.dispatch(new RecipesActions.FetchRecipe());
    // return this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES_BATCH),take(1));
    
    
    // return this.store.select('recipes').pipe(
    //   take(1),
    //   map((recipeState) => {
    //     return recipeState.recipes;
    //   }));

    // if(recipes. === 0) {
    //   this.store.dispatch(new RecipesActions.FetchRecipe());
    //   return this.dataStorageService.fetchRecipes();
    // }else {
    //     return recipes;
    // }
  }
}
