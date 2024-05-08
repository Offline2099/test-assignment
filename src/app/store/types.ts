import { Action, ActionReducer } from "@ngrx/store";
import { User } from "../types/user.interface";
import { Ticket } from "../types/ticket.interface";

export interface UserState {
  user: User | null;
  authLoading: boolean;
  authError: string | null;
}

export interface TicketsState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  user: UserState;
  tickets: TicketsState;
}

export interface AppStore {
  user: ActionReducer<UserState, Action>;
  tickets: ActionReducer<TicketsState, Action>;
}
