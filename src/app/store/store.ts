import { AppStore } from "./types";
import { userReducer, ticketsReducer } from "./reducers";
import { UserEffects } from "./effects";

export const appStore: AppStore = {
  user: userReducer,
  tickets: ticketsReducer
}

export const appEffects = [UserEffects];
