import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SingleCardComponent } from './single-card/single-card.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // single card
  { path: 'card/:id', component: SingleCardComponent , pathMatch: 'full'},
  // default
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
