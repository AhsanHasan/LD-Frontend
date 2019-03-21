import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UIModule } from './ui/ui.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './main/main.module#MainModule',
  },
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UIModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
