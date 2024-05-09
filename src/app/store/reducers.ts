import { createReducer, on } from "@ngrx/store";
import { UserState, TicketsState } from "./types";
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
  on(appActions.authLogout, (state) => ({ ...state, user: null })),
  on(appActions.updateUser, (state, action) => ({ ...state, user: action.user })),
);

const initialTicketsState: TicketsState = {
  tickets: [],
  isLoading: false,
  error: null
}

export const ticketsReducer = createReducer(
  initialTicketsState,
  on(appActions.getTickets, (state) => ({ ...state, isLoading: true })),
  on(appActions.getTicketsSuccess, (state, action) => ({ ...state, isLoading: false, tickets: action.tickets })),
  on(appActions.getTicketsFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
  on(appActions.clearTickets, (state) => ({ ...state, tickets: [] }))
);