import { Ingredient } from '../../shared/ingredient.model';
import  * as ShoppingListActions  from './shopping-list.actions';

export interface State {
  ingredients : Ingredient[];
  editedIngredient : Ingredient;
  editedIngredientIndex : number;
}


const initialState:State = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient : null,
  editedIngredientIndex : -1
};

export function shoppingListReducer(state:State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
      case ShoppingListActions.ADD_INGREDIENT:
          return {...state,ingredients:[...state.ingredients,action.payload ]};

      case ShoppingListActions.ADD_INGREDIENTS:
          return {...state,ingredients:[...state.ingredients,...action.payload ]};

      case ShoppingListActions.UPDATE_INGREDIENT:
        let newIngredient:Ingredient[] = state.ingredients.slice();
        newIngredient[state.editedIngredientIndex] = action.payload.updatedIngredient;
          return {...state,ingredients:[...newIngredient]};

          case ShoppingListActions.DELETE_INGREDIENT:
          return {...state,ingredients:state.ingredients.filter((element,index)=>{return index!== state.editedIngredientIndex})};

          case ShoppingListActions.START_EDIT:
          return {
            ...state,
            editedIngredient:{...state.ingredients[action.payload]},
            editedIngredientIndex:action.payload
          }
          case ShoppingListActions.STOP_EDIT:  
          return {
            ...state,
            editedIngredient:null,
            editedIngredientIndex:-1
          }
          default:
            return state;

  }
}
