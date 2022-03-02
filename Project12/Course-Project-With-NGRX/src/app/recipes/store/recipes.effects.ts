import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { Action, Store } from '@ngrx/store';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesAction.FETCH_RECIPE),
    withLatestFrom(this.store),
    switchMap(([data,state])=> {
        //if(state.recipes.recipes.length==0) {
      return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-ba5dc-default-rtdb.firebaseio.com/recipes.json'
        )
        .pipe(
          map((recipeData) => {
            return recipeData.map((x) => {
              if (!x['ingredients']) {
                return <Recipe>{ ...x, ingredients: [] };
              } else {
                return x;
              }
            });
          }),
          map((data) => {
            return new RecipesAction.FetchRecipesBatch(data);
          })
        );
    // }
    // else {
    //     return of(new RecipesAction.FetchRecipesBatch({...state.recipes.recipes}));
    // }
    })
  );

  @Effect({dispatch:false})
  saveRecipes = this.actions$.pipe(
    ofType(RecipesAction.SAVE_RECIPE),
    withLatestFrom(this.store),
    tap(([data,state]) => {
    this.http
            .put(
              'https://ng-course-recipe-book-ba5dc-default-rtdb.firebaseio.com/recipes.json',
              state.recipes.recipes
            ).pipe(take(1))
            .subscribe((resp) => {});
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}
