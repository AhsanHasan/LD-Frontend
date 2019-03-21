import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { UIModule } from '../ui/ui.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
          }
        ]
      }
    ])
  ]
})
export class MainModule { }
