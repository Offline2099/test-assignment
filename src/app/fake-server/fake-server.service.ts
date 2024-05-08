import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { User } from "../types/user.interface";
import { Ticket } from "../types/ticket.interface";
import { Users } from "./users";
import { Tickets } from "./tickets";

@Injectable()
export class FakeServer {

  delay: number = 1000;
  users: User[] = Users;
  tickets: Ticket[] = Tickets;

  getUser(username: string, password: string): Observable<User | null> {
    let user: User | undefined = this.users.find(u => u.username === username && u.password === password);
    return of(user || null).pipe(delay(this.delay));
  }

  getTickets(userId: number): Observable<Ticket[]> {
    return of(this.tickets.filter(t => t.userId === userId)).pipe(delay(this.delay));
  }
}