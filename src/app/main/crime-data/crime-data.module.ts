import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimeDataComponent } from './crime-data.component';
import { RouterModule } from '@angular/router';
import { CrimeDataResolver } from '../../resolvers/crime-data.resolver';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrimeDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CrimeDataComponent,
        resolve: { data: CrimeDataResolver }
      }
    ])
  ]
})
export class CrimeDataModule { }
