import { createAction, props } from "@ngrx/store";
import { User } from "../types/user.interface";

export const authAttempt = createAction('[User] Auth Attempt', props<{ username: string, password: string }>());
export const authSuccess = createAction('[User] Auth Success', props<{ user: User }>());
export const authFailure = createAction('[User] Auth Failure', props<{ error: string }>());
export const authLogout = createAction('[User] Auth Logout');