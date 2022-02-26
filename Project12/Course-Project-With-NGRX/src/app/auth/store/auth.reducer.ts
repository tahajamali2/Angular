import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authErrorMessage:string;
  loading:boolean
}

const initialState: State = {
  user: null,
  authErrorMessage:null,
  loading:false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const loginUser = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {...state,user:loginUser,authErrorMessage:null,loading:false}
    case AuthActions.LOGOUT:
        return {...state,user:null}
    
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
        return {...state,authErrorMessage:null,loading:true}

    case AuthActions.AUTHENTICATE_FAIL:
        return {...state,user:null,authErrorMessage:action.payload.errorMessage,loading:false}

    case AuthActions.CLEAR_ERROR:
      return {...state,authErrorMessage:null}

    default:
      return state;
  }
}
