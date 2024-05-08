import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketComponent } from './components/ticket/ticket.component';

import { FakeServer } from './fake-server/fake-server.service';
import { appEffects, appStore } from './store/store';
import { UserEffects, TicketsEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    TicketsComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    EffectsModule.forFeature([UserEffects]),
    EffectsModule.forFeature([TicketsEffects]),
  ],
  providers: [
    provideAnimationsAsync(),
    provideStore(appStore),
    provideEffects(appEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
    FakeServer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
