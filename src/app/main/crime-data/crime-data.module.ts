import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimeDataComponent } from './crime-data.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CrimeDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CrimeDataComponent
      }
    ])
  ]
})
export class CrimeDataModule { }
