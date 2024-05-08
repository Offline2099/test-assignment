import { createSelector } from "@ngrx/store";
import { AppState } from "./types";

export const featureUser = (state: AppState) => state.user;
export const userSelector = createSelector(featureUser, (state) => state.user);
export const authLoadingSelector = createSelector(featureUser, (state) => state.authLoading);
export const authErrorSelector = createSelector(featureUser, (state) => state.authError);

export const featureTickets = (state: AppState) => state.tickets;
export const ticketsSelector = createSelector(featureTickets, (state) => state.tickets);
export const ticketsLoadingSelector = createSelector(featureTickets, (state) => state.isLoading);
export const ticketsErrorSelector = createSelector(featureTickets, (state) => state.error);
export const ticketSelector = (id: number) => createSelector(featureTickets, (state) => 
  state.tickets.find(t => t.id === id)
);