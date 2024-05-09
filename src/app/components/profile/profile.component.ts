import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../types/user.interface';
import { AppState } from '../../store/types';
import { userSelector } from '../../store/selectors';
import * as appActions from '../../store/actions';
import moment from 'moment';

const enum Profile {
  id = 'id',
  username = 'username',
  firstName = 'first-name',
  lastName = 'last-name',
  dateOfBirth = 'date-of-birth',
  city = 'city'
}

interface ProfileSection {
  id: `${Profile}`;
  name: string;
  content: number | string;
  type: 'text' | 'select' | 'date';
  input: FormControl | null;
  editing: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user$: Observable<User | null>;
  sub: Subscription;
  user: User | null = null;
  profileSections: ProfileSection[] = [];

  cities: string[] = ['London', 'New York', 'Tokyo', 'Bangkok', 'Moscow'];

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(userSelector));
    this.sub = this.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.profileSections = this.fillProfileSections(user);
      }
    });
  }

  newSection = (
    id: `${Profile}`,
    name: string,
    content: ProfileSection['content'],
    type: ProfileSection['type'],
    input: ProfileSection['input']): ProfileSection => {
    return {id, name, content, type, input, editing: false}
  }

  fillProfileSections = (u: User): ProfileSection[] => {
    return [
      this.newSection(Profile.id, 'User ID', u.id, 'text', null),
      this.newSection(Profile.username, 'Username', u.username, 'text', new FormControl(u.username)),
      this.newSection(Profile.firstName, 'First Name', u.firstName, 'text', new FormControl(u.firstName)),
      this.newSection(Profile.lastName, 'Last name', u.lastName, 'text', new FormControl(u.lastName)),
      this.newSection(Profile.dateOfBirth, 'Date of Birth', u.created, 'date', new FormControl(u.created)),
      this.newSection(Profile.city, 'City', u.city, 'select', new FormControl(u.city))
    ];
  }

  toggleEditing(section: ProfileSection): void {
    section.editing = !section.editing;
  }

  submitEdit(seciton: ProfileSection): void {
    this.toggleEditing(seciton);
    switch (seciton.id) {
      case Profile.username:
        this.store.dispatch(appActions.updateUser({ 
          user: { ...this.user!, username: seciton.input?.value }
        }));
        break;
      case Profile.firstName:
        this.store.dispatch(appActions.updateUser({ 
          user: { ...this.user!, firstName: seciton.input?.value }
        }));
        break;
      case Profile.lastName:
        this.store.dispatch(appActions.updateUser({ 
          user: { ...this.user!, lastName: seciton.input?.value }
        }));
        break;
      case Profile.dateOfBirth:
        console.log();
        this.store.dispatch(appActions.updateUser({ 
          user: { ...this.user!, created: moment(seciton.input?.value).format('YYYY-MM-DD') }
        }));
        break;
      case Profile.city:
        this.store.dispatch(appActions.updateUser({ 
          user: { ...this.user!, city: seciton.input?.value }
        }));
        break;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
