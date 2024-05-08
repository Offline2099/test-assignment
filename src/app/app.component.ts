import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from './types/user.interface';
import { AppState } from './store/types';
import { userSelector } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  user$: Observable<User | null>;
  currentUser: User | null = null;
  
  menuItems = [
    { text: 'Home', icon: 'home', url: '/' },
    { text: 'Tickets', icon: 'commenting', url: '/tickets' },
    { id: 'profile', text: 'Profile', icon: 'manage_accounts', url: '' }
  ]

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(userSelector));
    this.user$.subscribe(user => {
      this.currentUser = user;
      this.updateProfileLink();
    });
  }

  updateProfileLink(): void {
    let menuItemProfile = this.menuItems.find(item => item.id === 'profile');
    if (menuItemProfile) menuItemProfile.url = '/profile/' + this.currentUser?.id || ''
  }

}
