import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { User } from "./types/user.interface";
import { AppState } from "./store/types";
import { userSelector } from "./store/selectors";

@Injectable({
  providedIn: "root"
}) 
export class RouteGuard {

  user$: Observable<User | null>;
  currentUser: User | null = null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.pipe(select(userSelector));
    this.user$.subscribe(user => this.currentUser = user);
  }

  canActivate() {
    if (!this.currentUser) {
      this.router.navigate(['login']);
    }
  }
}