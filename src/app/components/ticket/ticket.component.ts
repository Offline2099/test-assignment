import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Ticket } from '../../types/ticket.interface';
import { AppState } from '../../store/types';
import { ticketSelector } from '../../store/selectors';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent {

  ticketId: number = 0;
  ticket$: Observable<Ticket | undefined>;
  sub: Subscription;
  ticket: Ticket | undefined;
  ticketSections: {name: string, content: number | string}[] = [];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.ticket$ = this.store.pipe(select(ticketSelector(this.ticketId)));
    this.sub = this.ticket$.subscribe(t => {
      this.ticket = t;
      if (t) this.fillTicketSections(t);
    });
  }

  fillTicketSections = (t: Ticket) => {
    this.ticketSections = [
      {name: 'Ticket ID', content: t.id},
      {name: 'Ticket Created', content: t.created},
      {name: 'Ticket Name', content: t.name},
      {name: 'Ticket Description', content: t.description}
    ]
  } 

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
