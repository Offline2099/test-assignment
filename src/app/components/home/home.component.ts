import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  selectedTicketId: number = 0;

  selectTicketId(id: number): void {
    this.selectedTicketId = id;
  }
}
