import { createAction, props } from "@ngrx/store";
import { User } from "../types/user.interface";
import { Ticket } from "../types/ticket.interface";

// Authentication
export const authAttempt = createAction('[User] Auth Attempt', props<{ username: string, password: string }>());
export const authSuccess = createAction('[User] Auth Success', props<{ user: User }>());
export const authFailure = createAction('[User] Auth Failure', props<{ error: string }>());
export const authLogout = createAction('[User] Auth Logout');
export const updateUser = createAction('[User] Update User', props<{ user: User }>());

// Tickets
export const getTickets = createAction('[Ticket] Get Tickets', props<{ userId: number }>());
export const getTicketsSuccess = createAction('[User] Get Tickets Success', props<{ tickets: Ticket[] }>());
export const getTicketsFailure = createAction('[User] Get Tickets Failure', props<{ error: string }>());
export const clearTickets = createAction('[User] Clear Tickets');