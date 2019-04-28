import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDataComponent } from './property-data.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PropertyDataResolver } from 'src/app/resolvers/property-data.resolver';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PropertyDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PropertyDataComponent,
        resolve: { data: PropertyDataResolver }
      }
    ])
  ]
})
export class PropertyDataModule { }
