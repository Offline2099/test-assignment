import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FakeServer } from "../fake-server/fake-server.service";
import * as appActions from './actions'

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.authAttempt),
      mergeMap((action) => {
        return this.fakeServer
          .getUser(action.username, action.password)
          .pipe(
            map((user) => 
              user !== null ? 
                appActions.authSuccess({ user }) : 
                appActions.authFailure({ error: 'Wrong username or password' })
            ),
            catchError((error) => 
              of(appActions.authFailure({ error: error.message }))
            )
          )
      })
    )
  );
  constructor(private actions$: Actions, private fakeServer: FakeServer) {}
}

@Injectable()
export class TicketsEffects {
  getTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.getTickets),
      mergeMap((action) => {
        return this.fakeServer
          .getTickets(action.userId)
          .pipe(
            map((tickets) => appActions.getTicketsSuccess({ tickets })),
            catchError((error) => 
              of(appActions.getTicketsFailure({ error: error.message }))
            )
          )
      })
    )
  );
  constructor(private actions$: Actions, private fakeServer: FakeServer) {}
}