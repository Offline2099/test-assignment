import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../types/user.interface';
import { AppState } from '../../store/types';
import { userSelector } from '../../store/selectors';
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
  profileSections: ProfileSection[] = [];

   constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(userSelector));
    this.sub = this.user$.subscribe(user => {
      if (user) this.profileSections = this.fillProfileSections(user);
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

  toggleEditing(section: ProfileSection): void {
    section.editing = !section.editing;
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

  cities: string[] = ['London', 'New York', 'Tokyo', 'Bangkok', 'Moscow'];

  submitEdit(seciton: ProfileSection, value: string): void {
    this.toggleEditing(seciton);
    switch (seciton.id) {
      case Profile.username:
        console.log(value);
        break;
      case Profile.firstName:
        console.log(value);
        break;
      case Profile.lastName:
        console.log(value);
        break;
      case Profile.dateOfBirth:
        console.log(moment(value).format('YYYY-MM-DD'));
        break;
      case Profile.city:
        console.log(value);
        break;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
