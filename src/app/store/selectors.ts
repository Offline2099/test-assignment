import { createSelector } from "@ngrx/store";
import { AppState } from "./types";

export const featureUser = (state: AppState) => state.user;
export const userSelector = createSelector(featureUser, (state) => state.user);
export const authLoadingSelector = createSelector(featureUser, (state) => state.authLoading);
export const authErrorSelector = createSelector(featureUser, (state) => state.authError);