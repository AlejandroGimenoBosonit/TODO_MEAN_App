import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './tasks/pages/main-page/main-page.component';
import { NotFoundComponent } from './tasks/pages/not-found/not-found.component';

const routes: Routes = [
  // main page
  { path: 'main', component: MainPageComponent },
  // tasks
  {
    path: 'tasks',
    loadChildren: ()=> import('./tasks/tasks.module').then(module=>module.TasksModule)
  },
  // not found
  { path: 'not-found', component: NotFoundComponent },
  // default
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
