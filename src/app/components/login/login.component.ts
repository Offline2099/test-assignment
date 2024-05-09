import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../types/user.interface';
import { AppState } from '../../store/types';
import { userSelector, authLoadingSelector, authErrorSelector } from '../../store/selectors';
import * as appActions from '../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  passwordVisible: boolean = false;

  user$: Observable<User | null>;
  sub: Subscription;
  authLoading$: Observable<boolean>;
  authError$: Observable<string | null>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.user$ = store.pipe(select(userSelector));
    this.authLoading$ = store.pipe(select(authLoadingSelector));
    this.authError$ = store.pipe(select(authErrorSelector));
    this.sub = this.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/']);
      }
    })
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(appActions.authAttempt(this.loginForm.value));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
