import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipes.actions';

export interface State {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  selectedRecipeIndex: number;
  isInEditMode: boolean;
}

const initialState: State = {
  recipes: [],
  selectedRecipe: null,
  selectedRecipeIndex: -1,
  isInEditMode: false,
};

export function recipesReducer(
  state: State = initialState,
  action: RecipesAction.RecipesActions
) {
  switch (action.type) {
    case RecipesAction.ADD_RECIPE:
      const payloadToUpdate = {...action.payload};
      payloadToUpdate.id = state.recipes.length < 1 ? 1 : (state.recipes[state.recipes.length - 1].id + 1);
      return { ...state, recipes: [...state.recipes, payloadToUpdate] };

    case RecipesAction.UPDATE_RECIPE:
      let newRecipesUpdate: Recipe[] = state.recipes.slice();
      newRecipesUpdate[state.recipes.findIndex((obj) => {
        return obj.id === action.payload.id;
      })] = action.payload.recipe;
      return { ...state, recipes: [...newRecipesUpdate] };

    case RecipesAction.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((x) => x.id !== action.payload).slice(),
        ],
        selectedRecipe:null,
        selectedRecipeIndex:-1,
        isInEditMode:false
      };

    case RecipesAction.FETCH_RECIPES_BATCH:
      return { ...state, recipes: [...action.payload] };

    case RecipesAction.SELECT_RECIPE:
      return { ...state,selectedRecipe:action.payload,selectedRecipeIndex:state.recipes.indexOf(action.payload)
      , isInEditMode:false};

    case RecipesAction.START_EDIT_RECIPE:
      return { ...state,
       isInEditMode:true};

    case RecipesAction.STOP_EDIT_RECIPE:
    return { ...state,
      isInEditMode:false};

    default:
      return state;
  }
}
