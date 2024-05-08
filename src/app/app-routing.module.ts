import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketComponent } from './components/ticket/ticket.component';

import { RouteGuard } from './route-guard.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate:[RouteGuard],
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate:[RouteGuard]
  },
  { 
    path: 'tickets', 
    component: TicketsComponent,
    canActivate:[RouteGuard]
  },
  { 
    path: 'ticket/:id', 
    component: TicketComponent,
    canActivate:[RouteGuard]
  },
  { 
    path: '**', 
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
