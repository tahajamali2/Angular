import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const ADD_RECIPE = '[RECIPES] ADD RECIPE';
export const UPDATE_RECIPE = '[RECIPES] UPDATE RECIPE';
export const DELETE_RECIPE = '[RECIPES] DELETE RECIPE';
export const FETCH_RECIPE = '[RECIPES] FETCH RECIPE';
export const SAVE_RECIPE = '[RECIPES] SAVE RECIPE';
export const FETCH_RECIPES_BATCH = '[RECIPES] FETCH RECIPES BATCH';
export const SELECT_RECIPE = '[RECIPES] SELECT RECIPE';
export const START_EDIT_RECIPE = '[RECIPES] START EDIT RECIPE';
export const STOP_EDIT_RECIPE = '[RECIPES] STOP EDIT RECIPE';
export const DUMMY = '[RECIPES] DUMMY';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { recipe: Recipe; id: number }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

export class FetchRecipesBatch implements Action {
  readonly type = FETCH_RECIPES_BATCH;

  constructor(public payload: Recipe[]) {}
}

export class SaveRecipe implements Action {
  readonly type = SAVE_RECIPE;
}

export class SelectRecipe implements Action {
  readonly type = SELECT_RECIPE;

  constructor(public payload: Recipe) {}
}

export class StartRecipeEdit implements Action {
    readonly type = START_EDIT_RECIPE;
  }

  export class StopRecipeEdit implements Action {
    readonly type = STOP_EDIT_RECIPE;
  }

  export class Dummy implements Action {
    readonly type = DUMMY;
  }

export type RecipesActions =
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | SelectRecipe
  | FetchRecipe
  | FetchRecipesBatch
  | SaveRecipe
  | StartRecipeEdit
  | StopRecipeEdit;
