import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {CopyrightsComponent} from "./copyrights/copyrights.component";

@NgModule({
  declarations: [NavbarComponent, FooterComponent,CopyrightsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CopyrightsComponent
  ]
})
export class UIModule { }
