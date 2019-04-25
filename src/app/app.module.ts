import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InjectionModule } from './helpers/injection.module';
import { UIModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './main/main.module#MainModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [GuestGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UIModule,
    HttpClientModule,
    InjectionModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
