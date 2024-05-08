import { createReducer, on } from "@ngrx/store";
import { UserState } from "./types";
import * as appActions from './actions'

const initialUserState: UserState = {
  user: null,
  authLoading: false,
  authError: null
}

export const userReducer = createReducer(
  initialUserState,
  on(appActions.authAttempt, (state) => ({ ...state, authLoading: true, authError: null })),
  on(appActions.authSuccess, (state, action) => ({ ...state, user: action.user, authLoading: false, authError: null })),
  on(appActions.authFailure, (state, action) => ({ ...state, authLoading: false, authError: action.error })),
  on(appActions.authLogout, (state) => ({ ...state, user: null }))
);