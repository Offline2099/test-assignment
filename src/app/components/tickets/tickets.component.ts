import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../types/user.interface';
import { Ticket } from '../../types/ticket.interface';
import { AppState } from '../../store/types';
import { userSelector, ticketsSelector, ticketsLoadingSelector, ticketsErrorSelector } from '../../store/selectors';
import * as appActions from '../../store/actions';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

  @Input() homepageMode: boolean = false;
  @Output() idOnClick = new EventEmitter<number>;

  user$: Observable<User | null>;
  sub: Subscription;
  currentUserId: number = 0;

  tickets$: Observable<Ticket[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  displayedColumns: string[] = ['id', 'name', 'created'];

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.pipe(select(userSelector));
    this.sub = this.user$.subscribe(user => this.currentUserId = user ? user.id : 0);
    this.tickets$ = store.pipe(select(ticketsSelector));
    this.isLoading$ = store.pipe(select(ticketsLoadingSelector));
    this.error$ = store.pipe(select(ticketsErrorSelector));
  }
  
  ngOnInit(): void {
    this.store.dispatch(appActions.clearTickets());
    this.store.dispatch(appActions.getTickets({userId: this.currentUserId}));
  }

  handleRowClick(id: number) {
    if (this.homepageMode) this.idOnClick.emit(id);
    else this.router.navigate(['/ticket/' + id]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
